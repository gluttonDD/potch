import React, { useCallback, useState, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

type onOkPromiseFunc = (e: React.MouseEvent<HTMLElement>) => Promise<any>;

interface IProps extends ModalProps {
  content: Function;
  children: any;
  onBizOk?: onOkPromiseFunc;
  modalContent?: Function;
  onCancel?: Function;
}

const ModalWrapper = (props: IProps) => {
  const {
    content: Content,
    children,
    modalContent: ModalContent,
    onBizOk,
    onOk,
    onCancel,
    ...restProps
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onHide = useCallback(() => {
    if (onCancel) onCancel();
    setShowModal(false);
  }, []);
  const onOkCallback = useCallback(
    async e => {
      if (onBizOk) {
        setConfirmLoading(true);
        onBizOk(e)
          .then(res => {
            setConfirmLoading(false);
            setShowModal(false);
          })
          .catch(err => setConfirmLoading(false)); // 业务异常 解除loading
      } else {
        setShowModal(false);
        onOk && onOk(e);
      }
    },
    [onBizOk, onOk],
  );
  return (
    <>
      <Content onClick={() => setShowModal(true)} />
      <Modal
        width={800}
        confirmLoading={confirmLoading}
        {...restProps}
        visible={showModal}
        onCancel={onHide}
        onOk={onOkCallback}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalWrapper;
