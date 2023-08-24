import { UserInfo } from '@/interface';
import { useReduxSelector } from '@/redux';

export default function Home() {
  const userInfo: UserInfo | undefined = useReduxSelector(
    (state) => state.userInfo as UserInfo | undefined,
  );
  return <div></div>;
}
