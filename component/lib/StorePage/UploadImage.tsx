import { serverUtils } from '@/feature';
import { CSSProperties, useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { DeleteButton } from '../Button';

interface UploadImageProps {
  style?: CSSProperties;
  file: File;
  uploadEnd(url: string): void;
  delete(): void;
}

enum UploadState {
  '初始',
  '上傳中',
  '上傳失敗',
}
// TODO 上傳失敗可以重新點一下之後重新上傳
export function UploadImage(props: UploadImageProps) {
  const [state, setState] = useState<UploadState>(UploadState['初始']);
  const [preview, setPreview] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadProcess, setUploadProcess] = useState<number>(0);
  const [cancelUpload, setCancelUpload] = useState<boolean>(false);
  const isUploading = state === UploadState['上傳中'];
  useEffect(() => {
    let cancel = false;
    if (cancelUpload) {
      // TODO 觸發取消上傳
      setCancelUpload(false);
      setState(UploadState['上傳失敗']);
    } else {
      const objectUrl = URL.createObjectURL(props.file);
      setPreview(objectUrl);
      uploadFile(props.file);

      // 觸發uploading
      return () => {
        URL.revokeObjectURL(objectUrl);
        cancel = true;
        setState(UploadState['上傳失敗']);
      };
    }
    return () => {
      //
    };

    async function uploadFile(imageFile: File) {
      try {
        setErrorMessage('');
        setUploadProcess(0);
        setState(UploadState['上傳中']);

        const uploadUrl = await serverUtils.uploadImageFile(
          imageFile,
          setUploadProcess,
        );
        if (!cancel) props.uploadEnd(uploadUrl);
      } catch (error) {
        if (!cancel) setErrorMessage(`上傳發生錯誤 >> ${error}`);
      }
      if (!cancel) setState(UploadState['上傳失敗']);
    }
  }, [props.file, cancelUpload]);

  const style: CSSProperties = {
    position: 'relative',
    width: 'fit-content',
    ...props.style,
  };
  const hoverStyle: CSSProperties = {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
  };
  const uploadStyle: CSSProperties = {
    ...hoverStyle,
    visibility: isUploading ? 'visible' : 'hidden',
  };
  const uploadCancelButtonStyle: CSSProperties = {
    position: 'absolute',
    right: '5px',
    top: '5px',
    visibility: isUploading ? 'visible' : 'hidden',
    fontSize: '10px',
  };
  return (
    <div style={style}>
      <div style={uploadStyle}>
        <DeleteButton
          style={uploadCancelButtonStyle}
          onClick={() => setCancelUpload(true)}
        />
        <ProgressBar now={uploadProcess} />
        <span>{uploadProcess}%</span>
      </div>
      <DeleteButton
        style={{
          ...uploadCancelButtonStyle,
          visibility: !isUploading ? 'visible' : 'hidden',
        }}
        onClick={() => {
          props.delete();
        }}
      />
      <img
        src={preview}
        alt={'菜單圖片'}
        style={{
          maxWidth: '100%',
          border: '1px solid lightgray',
          maxHeight: '300px',
        }}
      />
    </div>
  );
}
