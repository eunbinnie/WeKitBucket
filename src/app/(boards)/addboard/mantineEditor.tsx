import React, { useState, useImperativeHandle, forwardRef } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import ImageUpload from "public/icons/imageUpload.svg";
import TextColor from "public/icons/textColor.svg";

import CommonModal from "@/components/modal/CommonModal";
import postImage from "@/apis/image/postImage";
import CameraIcon from "public/icons/camera.svg";
import { Image as MantineImage, Popover } from "@mantine/core";
import ImageExtension from "@tiptap/extension-image";
import "./addboardStyles.css";

interface ContentLength {
  withSpaces: number;
  withoutSpaces: number;
}

interface RichTextEditorProps {
  setContent: (editorContent: string, length: ContentLength) => void;
  initialContent: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function MantineEditor(
  props: RichTextEditorProps,
  ref: React.Ref<{ getHTML: () => string; loadContent: (content: string) => void }>,
) {
  const { setContent, initialContent, setImageUrl } = props;

  const editorInstance = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph", "bulletList", "orderedList", "listItem"] }),
      ImageExtension,
      TextStyle,
      Color,
      BulletList.configure({
        HTMLAttributes: {
          class: "custom-bullet-list",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "custom-ordered-list",
        },
      }),
      Placeholder.configure({
        placeholder: "내용을 입력해주세요.",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const editorContent = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorContent, "text/html");
      const textContent = doc.body.textContent || "";
      const length = {
        withSpaces: textContent.length,
        withoutSpaces: textContent.replace(/\s/g, "").length,
      };
      setContent(editorContent, length);
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editorInstance?.getHTML() || "",
    loadContent: (content: string) => {
      if (editorInstance) {
        editorInstance.commands.setContent(content);
      }
    },
  }));

  const [file, setFile] = useState<File | null>(null);
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const imgFile = event.target.files[0];
      setFile(imgFile);
      setDisabled(false);
    } else {
      console.log("파일이 선택되지 않았거나 파일 입력이 비워졌습니다.");
    }
  };

  const handleActive = () => {
    setActive(!active);
    setDisabled(true);
  };

  const handleSubmit = async () => {
    try {
      if (file && editorInstance) {
        const response = await postImage(file);
        const imageUrl = response.url;
        editorInstance.chain().focus().setImage({ src: imageUrl }).run();
        setActive(false);
        setFile(null);
        setImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("이미지 업로드 실패: ", error);
    }
  };

  if (!editorInstance) {
    return null;
  }

  return (
    <div>
      <RichTextEditor editor={editorInstance}>
        <RichTextEditor.Toolbar sticky stickyOffset={60} className="custom-toolbar">
          <div className="toolbar-group">
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />

              <Popover opened={colorPickerOpen} onClose={() => setColorPickerOpen(false)} position="bottom" withArrow>
                <Popover.Target>
                  <RichTextEditor.Control onClick={() => setColorPickerOpen(o => !o)} aria-label="텍스트 색상 선택">
                    <TextColor />
                  </RichTextEditor.Control>
                </Popover.Target>
                <Popover.Dropdown>
                  <div className="color-picker">
                    {["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"].map(color => (
                      <button
                        key={color}
                        style={{ backgroundColor: color, width: "20px", height: "20px", margin: "2px", border: "none" }}
                        onClick={() => {
                          editorInstance.chain().focus().setColor(color).run();
                          setColorPickerOpen(false);
                        }}
                        aria-label={`색상 선택 ${color}`}
                      />
                    ))}
                  </div>
                </Popover.Dropdown>
              </Popover>

              <RichTextEditor.Control onClick={handleActive} aria-label="이미지 업로드" title="이미지 업로드">
                <ImageUpload />
              </RichTextEditor.Control>
            </RichTextEditor.ControlsGroup>
          </div>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <div className="rich-text-editor-contentWrapper">
          <RichTextEditor.Content className="rich-text-editor-content" />
        </div>
      </RichTextEditor>

      <CommonModal
        active={active}
        close={handleActive}
        spacing="100px"
        callbackClose={() => {
          setFile(null);
        }}
      >
        <div className="flex flex-col justify-center gap-5">
          <h3 className="text-center text-lg font-semibold leading-[1.4] text-primary-gray-500">이미지</h3>
          {file ? (
            <div className="image-container">
              <MantineImage src={URL.createObjectURL(file)} alt={file.name} style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <div className="image-placeholder">
              <CameraIcon width="28.5" height="25.5" />
              <input type="file" onChange={handleChangeImage} className="file-input" aria-label="이미지 업로드" />
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
            className={`ml-auto h-10 w-[90px] rounded-[10px] ${
              !disabled
                ? "cursor-pointer bg-primary-green-200 hover:bg-primary-green-300"
                : "cursor-not-allowed bg-primary-gray-300"
            } text-sm font-semibold leading-[1.7] text-white`}
          >
            삽입하기
          </button>
        </div>
      </CommonModal>
    </div>
  );
}

export default forwardRef(MantineEditor);
