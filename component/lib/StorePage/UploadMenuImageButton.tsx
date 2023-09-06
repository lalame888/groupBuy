import { CSSProperties, useRef, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { DeleteButton, MyHoverButton } from '../Button';
import { UploadImage } from './UploadImage';

interface UploadMenuImageButtonProps {
  style?: CSSProperties;
  uploaded: React.Dispatch<React.SetStateAction<string[]>>;
  images: Array<string>;
}

export function UploadMenuImageButton(props: UploadMenuImageButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploadingList, setIsUploadingList] = useState<File[]>([]);
  const isUploading: boolean = isUploadingList.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  async function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files?.length) {
      setIsUploadingList((list) => {
        const inputList = Array.from(files);
        return [...list, ...inputList];
      });
    }
    event.target.value = '';
  }

  const style: CSSProperties = {
    ...props.style,
  };
  const uploadListDivStyle: CSSProperties = {
    minHeight: '300px',
    maxHeight: 'min(600px,calc(100vh - 300px))',
    border: '1px solid lightgray',
    borderRadius: '10px',
    overflowY: 'auto',
  };

  function deleteUploading(file: File) {
    setIsUploadingList((oldList) => {
      const newList = [...oldList];
      const index = newList.findIndex((f) => f === file);
      newList.splice(index, 1);
      return newList;
    });
  }

  // TODO: 拖曳排序？
  return (
    <>
      <MyHoverButton
        theme="green"
        style={style}
        onClick={() => setIsModalOpen(true)}
      >
        {props.images.length > 0 ? '管理上傳菜單照片' : '新增菜單照片'}
      </MyHoverButton>
      <input
        type={'file'}
        style={{ display: 'none' }}
        onChange={onInputChange}
        value={undefined}
        accept="image/*"
        ref={inputRef}
        multiple={true}
      />
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg">
        <Modal.Header closeButton>
          <h3>上傳列表</h3>
        </Modal.Header>
        <Modal.Body>
          <p>
            <MyHoverButton
              onClick={() => {
                if (inputRef.current) inputRef.current.click();
              }}
            >
              新增照片
            </MyHoverButton>
          </p>
          <div style={uploadListDivStyle}>
            <Table>
              <thead>
                <tr>
                  <th>
                    成功上傳 共{props.images.length + isUploadingList.length} 筆
                  </th>
                  <th></th>
                  <th style={{ textAlign: 'center' }}>刪除</th>
                </tr>
              </thead>
              <tbody>
                {props.images.map((image, index) => {
                  return (
                    <tr key={`${image}`}>
                      <td
                        align="center"
                        valign="middle"
                        style={{ width: '150px', fontSize: '18px' }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        <img
                          src={image}
                          alt={image}
                          style={{ maxHeight: '150px' }}
                        />
                      </td>
                      <td
                        align="center"
                        valign="middle"
                        style={{ fontSize: '18px' }}
                      >
                        <DeleteButton
                          onClick={() => {
                            props.uploaded((oldList) => {
                              const newList = [...oldList];
                              const index = newList.findIndex(
                                (f) => f === image,
                              );
                              newList.splice(index, 1);
                              return newList;
                            });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
                {isUploadingList.map((imageFile, index) => {
                  return (
                    <tr key={`${imageFile.name}`}>
                      <td
                        align="center"
                        valign="middle"
                        style={{ width: '150px', fontSize: '18px' }}
                      >
                        {props.images.length + index + 1}
                      </td>
                      <td>
                        <UploadImage
                          file={imageFile}
                          uploadEnd={(uploadImage) => {
                            deleteUploading(imageFile);
                            props.uploaded((oldList) => {
                              return [...oldList, uploadImage];
                            });
                          }}
                          delete={() => {
                            deleteUploading(imageFile);
                          }}
                        />
                      </td>
                      \{' '}
                      <td
                        align="center"
                        valign="middle"
                        style={{ fontSize: '18px' }}
                      >
                        <DeleteButton
                          onClick={() => {
                            deleteUploading(imageFile);
                          }}
                        />
                      </td>
                      \{' '}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <Modal.Footer>
            <MyHoverButton
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              完成
            </MyHoverButton>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
