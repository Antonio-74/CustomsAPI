import { Request, Response } from 'express';
import { ICreateEmployeeUseCase, IGetEmployeeByIdUseCase, IGetEmployeesUseCase, IStatusEmployeeUseCase, IUpdateEmployeeUseCase } from "../../../domain/ports";
import { ResponseUtil } from '../../../../../shared/utils';
import { CreateEmployeeDto, GetEmployeesDto, StatusEmployeeDto, UpdateEmployeeDto } from '../../../application/dtos';

export class EmployeeController {

    constructor (
        private readonly createEmployeeUseCase: ICreateEmployeeUseCase,
        private readonly updateEmployeeUseCase: IUpdateEmployeeUseCase,
        private readonly getEmployeeByIdUseCase: IGetEmployeeByIdUseCase,
        private readonly getEmployeesUseCase: IGetEmployeesUseCase,
        private readonly statusEmployeeUseCase: IStatusEmployeeUseCase
    ) {}

    createEmployeeRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const [ error, createEmployeeDto ] = await CreateEmployeeDto.create(body);

            // validate create employee dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // create employee entity to save
            const { name, lastname } = createEmployeeDto!;
            const employeeEmtity = await createEmployeeDto!.toEntity();
            const employeeCreated = await this.createEmployeeUseCase.execute(employeeEmtity);

            ResponseUtil.created(res, employeeCreated, `Employee ${name} ${lastname} created successfully`);
        } catch (error){
            ResponseUtil.internalError(res, error as string);
        }
    }

    updateEmployeeRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [ error, updateEmployeeDto ] = await UpdateEmployeeDto.create(body, +params.id);

            // validate update employee dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if employee exist
            const employeeFound = await this.getEmployeeByIdUseCase.execute(+params.id);
            if(!employeeFound) {
                ResponseUtil.notFound(res, `Employee with id ${params.id} was not found!`);
                return;
            }

            // create employee entity and update
            const { name, lastname } = updateEmployeeDto!;
            const employeeEntity = await updateEmployeeDto!.toEntity();
            const employeeUpdated = await this.updateEmployeeUseCase.execute(employeeEntity);

            ResponseUtil.ok(res, employeeUpdated, `Employee ${name} ${lastname} was updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getEmployeeByIdRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;

            // validate if id param is number
            if(isNaN(+params.id)) {
                ResponseUtil.badRequest(res, `id param has to be a number`);
                return;
            }

            // get employee
            const employee = await this.getEmployeeByIdUseCase.execute(+params.id);

            if(!employee) {
                ResponseUtil.notFound(res, `Employee with id ${+params.id} was not found!`);
                return;
            }

            ResponseUtil.ok(res, employee);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getEmployeesRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            const [ error, getEmployeesDto ] = await GetEmployeesDto.create(+params.active);

            // validate get employees dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // get employees
            const { active } = getEmployeesDto!;
            const employees = await this.getEmployeesUseCase.execute(active);
            
            ResponseUtil.ok(res, employees);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    statusEmployeeRequest = async(req: Request, res: Response) => {
        try {
            const { body, params } = req;
            const [ error, statusEmployeeDto ] = await StatusEmployeeDto.create(+params.id, body);

            // validate status employee dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // check if employee exists
            const employeeFound = await this.getEmployeeByIdUseCase.execute(+params.id);

            if(!employeeFound) {
                ResponseUtil.notFound(res, `Employee with id ${+params.id} was not found!`);
                return;
            }

            // change employee status
            const { id, active } = statusEmployeeDto!;
            const employeeStatusUpdated = await this.statusEmployeeUseCase.execute(id, active);

            ResponseUtil.ok(res, employeeStatusUpdated, `Employee status updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}