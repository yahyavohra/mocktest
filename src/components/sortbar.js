import { useRouter } from 'next/router';
import { Arrow } from "../../src/assets/arrow";
import { handleSorting } from '../../utils/services';

const Sortbar = ({ handlePost, allposts }) => {
    const router = useRouter()
    const handleSort = async (key) => {
        var objquery = { ...router.query, ...key }
        router.push({
            query: objquery
        }, undefined, { shallow: true })
    }
    const ObjectRender = ({ keyId, children }) => (
        <a className={`thead ${router.query.sortby == keyId ? 'active' : ''}  `} onClick={(e) => { router.query.sortby == keyId ? (handleSort({ sortby: null })) : (handleSort({ sortby: keyId })) }}>{children} </a>
    )
    return (
        <>
            <div className="row">
                <div className="column" >
                    <div className="top">
                        <ObjectRender keyId='logId' >Log ID</ObjectRender>
                    </div>
                </div>
                <div className="column" >
                    <ObjectRender keyId='applicationType' >Application Type</ObjectRender>
                </div>
                <div className="column"  >
                    <ObjectRender keyId='applicationId' >Application ID </ObjectRender>

                </div>
                <div className="column">
                    <ObjectRender keyId='actionType' >Action</ObjectRender>
                </div>
                <div className="column">
                    Action Details
                </div>
                <div className="column " id="cype_sort_test" >
                    <ObjectRender keyId='creationTimestamp' >Date: Time</ObjectRender>
                </div>
            </div>
        </>
    );
};

export default Sortbar;