// https://swagger-autogen.github.io/docs/
import swaggerAutogen from "swagger-autogen";
import { createTagsComponents } from "./createTagsComponents";

/* crear la funcion de tags y components */
const schema = createTagsComponents();

const doc = {
  info: {
    version: "0.0.1",
    title: "savj-construcciones-apis",
    description: "Documentacion del aplicativo <b>savj-construcciones-apis</b>",
  },
  host: "localhost:4500",
  tags: schema.tags,
  definitions: {
    ...schema.components,
    ...schema.responseSuccess,
    countSuccess    : { error: false, data: 3 },
    bulkSuccess     : { error: false, message: "Datos Ingresados Con exito" },
    unsuccessfully  : { error: true, message: "SERVER_PROBLEM", typeError: "unkown" },
    errorMessage    : { error: true, message: "error"},
    unauthorized    : { error:true, message: 'YOU_DONT_HAVE_UNAUTHORIZED'},
    updateToken     : { message: 'UPDATE_TOKEN', token: "string" },
    uncompleted     : { error: true, message: 'INCOMPLETE_INFORMATION', missings: ["list"]}
  }
};

const outputFile = "src/documentation/swagger-output.json";
const routes = [ "src/services/index.ts" ];

swaggerAutogen()(outputFile, routes, doc).then((items) => {
  console.log('documentacion actualizada');
});
