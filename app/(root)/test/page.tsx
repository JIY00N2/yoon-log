"use client";

import { Modal, Tooltip } from "jiyoon-ds";

export default function TestPage() {
  return (
    <>
      <Modal.Root>
        <Modal.Trigger>모달 트리거</Modal.Trigger>
        <Modal.Content>
          내용
          <Modal.Close>닫기</Modal.Close>
        </Modal.Content>

        <Modal.Overlay />
      </Modal.Root>
      <Tooltip.Root direction="top">
        <Tooltip.Arrow />
        <Tooltip.Content>툴팁ㅎㅎ</Tooltip.Content>
        <Tooltip.Trigger>툴팁 트리거</Tooltip.Trigger>
      </Tooltip.Root>
    </>
  );
}
