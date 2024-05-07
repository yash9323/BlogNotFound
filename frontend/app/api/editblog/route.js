import { NextResponse } from "next/server";
import { request } from "graphql-request";
import queries from "../../../queries";
import { Buffer } from "buffer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAVHICLEGMPT5NJWXS",
    secretAccessKey: "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",
  },
});

async function s3upload(file, fileName) {
  const fileBuffer = file;
  const params = {
    Bucket: "blognotf",
    Key: `images/${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    let fg = formData.get("fg");
    let id = formData.get("id");
    let tag = formData.get("tag");
    let title = formData.get("title");
    let content = formData.get("content");
    let userId = formData.get("userId");

    // add validation

    if (fg == "false") {
      const res = await request("http://localhost:4000/", queries.EDIT_BLOG, {
        id: id,
        userId: userId,
        title: title,
        tag: tag,
        content: content,
      });
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      let image = formData.get("file");

      // uploading image

      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = await s3upload(buffer, image.name);

      // // add to database
      const res = await request("http://localhost:4000/", queries.EDIT_BLOG, {
        id: id,
        title: title,
        content: content,
        tag: tag,
        userId: userId,
        image: `https://blognotf.s3.amazonaws.com/images/${fileName}`,
      });
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error While Adding Blog" },
      { status: 400 }
    );
  }
}
