import { NO_IMAGE } from '@/data';
import { serverUtils } from '@/feature';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { DeleteButton } from '../Button';

interface StoreImageUploadProps {
  style?: CSSProperties;
  updateUrl(newImage: string | undefined): void; // 點擊、選擇完圖片之後，如果上傳成功就會吐url回去
  imgUrl: string | undefined;
}

export function StoreImageUpload(props: StoreImageUploadProps) {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string>('');
  const [isHover, setIsHover] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadProcess, setUploadProcess] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [cancelUpload, setCancelUpload] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const style: CSSProperties = {
    cursor: 'pointer',
    position: 'relative',
    ...props.style,
  };

  const hoverStyle: CSSProperties = {
    visibility: isHover && !isUploading ? 'visible' : 'hidden',
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
    color: 'white',
    right: '5px',
    top: '5px',
    visibility: isHover && isUploading ? 'visible' : 'hidden',
    fontSize: '10px',
  };
  useEffect(() => {
    let cancel = false;
    if (cancelUpload) {
      // TODO 觸發取消上傳
      setImageFile(undefined);
      setCancelUpload(false);
      setIsUploading(false);
      props.updateUrl(undefined);
    } else if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      uploadFile(imageFile);
      // 觸發uploading
      return () => {
        URL.revokeObjectURL(objectUrl);
        cancel = true;
        setIsUploading(false);
      };
    } else {
      setPreview('');
    }
    return () => {
      //
    };

    async function uploadFile(imageFile: File) {
      try {
        setErrorMessage('');
        setUploadProcess(0);
        setIsUploading(true);
        const uploadUrl = await serverUtils.uploadImageFile(
          imageFile,
          setUploadProcess,
        );
        if (!cancel) props.updateUrl(uploadUrl);
      } catch (error) {
        if (!cancel) setErrorMessage(`上傳發生錯誤 >> ${error}`);
      }
      if (!cancel) setIsUploading(false);
    }
  }, [imageFile, cancelUpload]);

  return (
    <div style={style} onMouseEnter={() => setIsHover(true)}>
      <div
        style={hoverStyle}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (inputRef.current && isUploading === false)
            inputRef.current.click();
        }}
      >
        點擊更換上傳店家封面
      </div>
      <div
        style={uploadStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <DeleteButton
          style={uploadCancelButtonStyle}
          onClick={() => setCancelUpload(true)}
        />
        <ProgressBar now={uploadProcess} />
        <span>{uploadProcess}%</span>
      </div>
      <span onMouseEnter={() => setIsHover(true)}>
        <DeleteButton
          style={{
            ...uploadCancelButtonStyle,
            visibility:
              !isUploading && isHover && (props.imgUrl || preview)
                ? 'visible'
                : 'hidden',
          }}
          onClick={() => {
            setImageFile(undefined);
            props.updateUrl(undefined);
          }}
        />
      </span>
      <img
        src={props.imgUrl || preview || NO_IMAGE.src}
        alt={'選擇上傳圖片'}
        style={{
          maxWidth: '100%',
          border: '1px solid lightgray',
          maxHeight: '300px',
        }}
      />
      <input
        type={'file'}
        style={{ display: 'none' }}
        ref={inputRef}
        multiple={false}
        accept="image/*"
        onChange={(event) => {
          if (event.target.files?.length) {
            const file = Array.from(event.target.files)[0];
            if (file.size <= 50 * 1024 * 1024) {
              // 大小防呆
              setImageFile(file);
            } else {
              // TODO: 超過大小了跳警告
              alert('上傳檔案過大！圖片大小需小於50MB，請重新選擇。');
            }
            if (inputRef.current) inputRef.current.value = ''; // 清空
          }
        }}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
