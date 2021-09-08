import cloudinary from "cloudinary";
const { fileUpload } = require("../../helpers/fileUpload");

cloudinary.config({
  cloud_name: "alexsonc",
  api_key: "368789827592451",
  api_secret: "QQEpo2QcztQAhedx55hHvBRmUAY",
});

describe("pruebas en el fileupload", () => {
  test("debe de cargar un archivo y retornar el url", async () => {
    const resp = await fetch(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbH1VfbUHS0O3FCulHR89O2u01e6h2hYZpDQ&usqp=CAU"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // borrar imagen por ID
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    cloudinary.v2.api.delete_resources(imageId, {});
  });

  test("debe de retornar un error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
