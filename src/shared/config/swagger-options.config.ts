import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Customs API",
            version: "1.0.0",
            description: "API for Customs"
        },
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number",
                            description: "User ID"
                        },
                        username: {
                            type: "string",
                            description: "Username"
                        },
                        email: {
                            type: "string",
                            description: "User email"
                        },
                        role: {
                            type: "string",
                            description: "User role"
                        },
                        employeeId: {
                            type: "number",
                            description: "User employee ID"
                        }
                    },
                    required: ["id", "username", "email", "role", "employeeId"]
                }
            }
        }
    },
    apis: [
        './src/modules/auth/interfaces/http/routes/*.ts',
        './src/modules/catalog/interfaces/http/routes/*.ts',
    ]
}

export const swaggerSpec = swaggerJSDoc(options);