import { Arrow } from "../../src/assets/arrow";

const Sortbar = ({ handlePost, allposts }) => {

    const handleSort = async (event, key) => {
        let active
        if (event.target.classList == "active") {
            event.target.classList.remove('active');
            active = false
        } else {
            event.target.classList.add('active');
            active = true
        }
        const sortedData = [...allposts].sort((a, b) => {
            a = a[`${key}`]
            b = b[`${key}`]
            return active ? a > b ? 1 : -1 : a > b ? -1 : 1
        })
        handlePost(sortedData)
    }
    return (
        <>
            <div className="row">
                <div className="column" >
                    <div className="top">
                        <a onClick={(e) => { handleSort(e, 'logId') }}>Log ID <Arrow /> </a>
                    </div>
                </div>
                <div className="column" >
                    <a onClick={(e) => { handleSort(e, 'logId') }}>Application Type <Arrow />  </a>
                </div>
                <div className="column"  >
                    <a onClick={(e) => { handleSort(e, 'applicationId') }}>Application ID <Arrow />  </a>
                </div>
                <div className="column">
                    <a onClick={(e) => { handleSort(e, 'actionType') }}>Action <Arrow />  </a>
                </div>
                <div className="column">
                    Action Details
                </div>
                <div className="column" >
                    <a onClick={(e) => { handleSort(e, 'creationTimestamp') }}>Date:Time <Arrow /> </a>
                </div>
            </div>
        </>
    );
};

export default Sortbar;