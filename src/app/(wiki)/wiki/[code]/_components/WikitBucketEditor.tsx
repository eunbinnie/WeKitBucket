/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-async-promise-executor */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-promise-reject-errors */
// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line no-async-promise-executor

import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Heading,
  Paragraph,
  Link,
  Underline,
  List,
  Alignment,
  Image,
  ImageUpload,
  MediaEmbed,
  FontSize,
  FontColor,
  FontFamily,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageToolbar,
  Autoformat,
  ListProperties,
  TodoList,
  AdjacentListsSupport,
  Markdown,
  Clipboard,
  ShowBlocks,
  SelectAll,
} from "ckeditor5";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";
import { UploadAdapter, FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";

import "ckeditor5/ckeditor5.css";
import postImage from "@/apis/image/postImage";

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          if (file) {
            const result = await postImage(file);
            resolve({
              default: result.url,
            });
          }
        } catch (error) {
          reject("Error");
        }
      });
    },
    abort: () => {},
  };
}

function uploadPlugin(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return uploadAdapter(loader);
  };
}

interface IWikitBucketEditor {
  initialData: string;
  handleChangeData: (name: string, value: string) => void;
}

function WikitBucketEditor({ initialData, handleChangeData }: IWikitBucketEditor) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        language: "ko",
        plugins: [
          Autoformat,
          Markdown,
          Clipboard,
          Essentials,
          Bold,
          Italic,
          Underline,
          Paragraph,
          Heading,
          FontSize,
          FontColor,
          FontFamily,
          Link,
          List,
          ListProperties,
          AdjacentListsSupport,
          TodoList,
          Alignment,
          Image,
          ImageUpload,
          MediaEmbed,
          ImageToolbar,
          ImageResizeEditing,
          ImageResizeHandles,
          SelectAll,
          ShowBlocks,
        ],
        toolbar: {
          items: [
            "bold",
            "italic",
            "underline",
            "|",
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "alignment",
            "|",
            "imageUpload",
            "mediaEmbed",
            "link",
            "resizeImage",
            "resizeImage:50",
            "resizeImage:75",
            "resizeImage:original",
            "resizeImage:custom",
            "|",
            "selectAll",
            "showBlocks",
          ],
        },
        fontFamily: {
          options: [
            "default",
            "Arial, Helvetica, sans-serif",
            "Courier New, Courier, monospace",
            "Georgia, serif",
            "Lucida Sans Unicode, Lucida Grande, sans-serif",
            "Tahoma, Geneva, sans-serif",
            "Times New Roman, Times, serif",
            "Trebuchet MS, Helvetica, sans-serif",
            "Verdana, Geneva, sans-serif",
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [9, 11, 13, 16, 17, 19, 21, 23, 26, 28, 32],
        },
        fontColor: {
          colorPicker: {
            // Use 'hex' format for output instead of 'hsl'.
            format: "hex",
          },
        },
        image: {
          resizeUnit: "px",
          resizeOptions: [
            {
              name: "resizeImage:original",
              label: "Original",
              value: null,
            },
            {
              name: "resizeImage:custom",
              label: "Custom",
              value: "custom",
            },
            {
              name: "resizeImage:100",
              label: "100px",
              value: "100",
            },
            {
              name: "resizeImage:200",
              label: "200px",
              value: "200",
            },
          ],
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "원본",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "제목 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "제목 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "제목 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "제목 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "제목 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "제목 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },

        extraPlugins: [uploadPlugin],
      }}
      data={initialData}
      onReady={editor => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor 1 is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        handleChangeData("content", data);
      }}
    />
  );
}

export default WikitBucketEditor;
