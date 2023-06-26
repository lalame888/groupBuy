
import { GroupBuyObject } from "@/interface/lib/GroupBuyObject";
import { CSSProperties} from "react"
import { useGroupBuyList } from "./utils/useNowGroupBuy";
import { ChildMenu, Layout, MyHoverButton, PaginationSelector, SearchInput, GroupBuyListCard } from "@/component";

export default function NowGroup(){
    const {
        errorMessage,
        showList,
        loadStatus,
        pagination:{
            maxPage,
            pageNumber,
            setPageNumber
        },
        searchInput
    } = useGroupBuyList('now');
    const searchDivStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px'
    }
    
    return(
        <Layout
            status={{loadStatus, errorMessage}}
            shouldLoginTurnToHome
        >
            <ChildMenu/>
            <div style={searchDivStyle}>
                <MyHoverButton
                    theme="green"
                    style={{minWidth:'110px',marginRight:'20px'}}
                    to={`/NewOpen`}
                >
                    ＋開新團
                </MyHoverButton>
                <div style={{display: 'flex'}}>
                    <SearchInput 
                        onChange={(newValue: string)=> searchInput.set(newValue)}
                        value={searchInput.value}
                    />
                    <PaginationSelector
                        nowPageNumber={pageNumber}
                        maxPageNumber={maxPage}
                        setPageNumber={setPageNumber}
                    />
                </div>
            </div>
            <div>
            {showList.map((object: GroupBuyObject)=>
                <GroupBuyListCard
                    key={object.uid}
                    groupBuyObject={object}
                />
            )}
            </div>
        </Layout>
    )
}