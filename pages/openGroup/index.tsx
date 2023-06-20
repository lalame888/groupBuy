import { UserInfo } from "@/interface";
import { useReduxSelector } from "@/redux";

export default function OpenGroup() {
  const userInfo: UserInfo | undefined = useReduxSelector((state)=> state.userInfo as UserInfo | undefined);
    console.log(userInfo)
  return (
    <div>OpenGroup</div>
  )
}
