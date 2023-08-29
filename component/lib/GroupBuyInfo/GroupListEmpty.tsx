import { THEME } from '@/styles/theme';
import { MyHoverButton } from '../Button';

export function GroupListEmpty() {
  return (
    <div>
      <MyHoverButton
        style={{ border: THEME.border, backgroundColor: '#E5E5E533' }}
        to={`/NewOpen`}
      >
        <div style={{ marginTop: '1rem' }}>
          <p>目前沒有任何團單</p>
          <p>點選此區塊開新團單</p>
        </div>
      </MyHoverButton>
    </div>
  );
}
