import {
  ChildMenu,
  Layout,
  MyHoverButton,
  MyInput,
  PageTitle,
  StoreBusinessTime,
  StoreImageUpload,
  UploadMenuImageButton,
} from '@/component';
import { CSSProperties } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAddStore } from './utils/useAddStore';
import { MenuCanvas } from '@/component/lib/Image/MenuCanvas';
import { useRouter } from 'next/router';

export default function AddStore() {
  const router = useRouter();
  const initName = (router.query.search as string) || ''; // 從網址參數拿
  const { state, set, isSaving, showInvalid, errorMessage, saveStore } =
    useAddStore(initName);
  const style: CSSProperties = {
    position: 'relative',
  };
  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };
  const rowTextStyle: CSSProperties = {
    wordBreak: 'keep-all',
  };
  return (
    <Layout shouldLoginTurnToHome>
      <ChildMenu />
      <div style={style}>
        <PageTitle title="新增店家" style={{ marginBottom: '20px' }} />
        <Row style={{ fontSize: '18px' }}>
          <Col md={3} sm={6} style={{ padding: '0px 20px 20px 20px' }}>
            <StoreImageUpload
              updateUrl={(imageUrl: string | undefined) => {
                set.setStoreImage(imageUrl);
              }}
              imgUrl={state.storeImage}
            />
          </Col>
          <Col md={9} sm={12}>
            <p style={rowStyle}>
              <span style={rowTextStyle}>店家名稱：</span>
              <MyInput
                inputValue={state.storeName}
                disabled={isSaving}
                onChange={(title) => {
                  set.setStoreName(title);
                }}
                style={{ maxWidth: '350px' }}
                isValidMessage={
                  showInvalid && state.storeName.trim() === ''
                    ? '請輸入店家名稱'
                    : ''
                }
              />
            </p>

            <p style={rowStyle}>
              <span style={rowTextStyle}>店家地址：</span>
              <MyInput
                disabled={isSaving}
                onChange={(address) => {
                  set.setAddress(address);
                }}
                inputValue={state.address}
              />
            </p>
            <p style={rowStyle}>
              <span style={rowTextStyle}>店家電話：</span>
              <MyInput
                disabled={isSaving}
                onChange={(phone) => {
                  set.setPhone(phone);
                }}
                inputValue={state.phone}
              />
            </p>
            <StoreBusinessTime
              time={state.businessHours}
              setTimeData={set.setBusinessHours}
            />
          </Col>
        </Row>
        <Row style={{ fontSize: '18px' }}>
          <p style={rowStyle}>
            <span style={rowTextStyle}>菜單：</span>
            <UploadMenuImageButton
              images={state.menuImage}
              uploaded={set.setMenuImage}
            />
          </p>
        </Row>
        <Row style={{ display: 'flex' }}>
          {state.menuImage.length > 0 && (
            <MenuCanvas menuImage={state.menuImage} />
          )}
        </Row>
        <Row style={{ padding: '50px' }}>
          <MyHoverButton
            disabled={isSaving}
            onClick={saveStore}
            theme={'green'}
          >
            確定儲存
          </MyHoverButton>
        </Row>
      </div>
    </Layout>
  );
}
