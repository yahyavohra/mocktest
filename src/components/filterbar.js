import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { cleanObj } from '../../utils/services';
import { useState, useEffect } from "react";
import { isArray, isEmpty } from "lodash";


const Filterbar = ({ actionTypeSelector, applicationTypeSelector }) => {
    const { register, handleSubmit } = useForm({});
    const router = useRouter()
    const [mobileToggle, setMobileToggle] = useState(false)
    const onSubmit_handle = async (value) => {
        var objquery = { ...router.query, ...value }
        var cleanValue = cleanObj(objquery)
        router.push({

            query: cleanValue
        }, undefined, { shallow: true })

    };
    useEffect(() => {
        setMobileToggle(false)
    }, [router.isReady, router]);


    return (
        <>
            <div className="search">
                <div onClick={() => { setMobileToggle(!mobileToggle) }} className="searchToggle">
                    <button>Advance Search</button>
                </div>
                <form className={`${mobileToggle ? 'active' : ''}`} onSubmit={handleSubmit(onSubmit_handle)} >
                    <svg className="closeSearch" onClick={() => { setMobileToggle(!mobileToggle) }} xmlns="http://www.w3.org/2000/svg" width="22.794" height="22.794" viewBox="0 0 22.794 22.794" >
                        <g id="Group_248" data-name="Group 248" transform="translate(0.53 0.53)" >
                            <path id="Path_467" data-name="Path 467" d="M-14461,5749l21.733,21.733" transform="translate(14461 -5749)" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
                            <path id="Path_468" data-name="Path 468" d="M0,0,21.733,21.733" transform="translate(21.733) rotate(90)" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
                        </g>
                    </svg>
                    <div className="grouped">
                        <label htmlFor="">Employee Name</label>
                        <input {...register('employee_ename')} type="text" placeholder="eg. Admin User" />
                    </div>
                    <div className="grouped">
                        <label htmlFor="">Action Type</label>
                        <select id="cype_actiontype"  {...register('actionType')} >
                            <option></option>
                            {!isEmpty(actionTypeSelector) ? actionTypeSelector.map((data, index) => {
                                return (
                                    <option key={index} value={data.actionType} selected={data.actionType == router.query?.actionType ? true : false} >{data.actionType}</option>
                                )
                            }) : null}
                        </select>

                    </div>
                    <div className="grouped">
                        <label htmlFor="">Application Type</label>
                        <select {...register('applicationType')}  >
                            <option></option>
                            {!isEmpty(applicationTypeSelector) ? applicationTypeSelector.map((data, index) => {
                                return (
                                    <option key={index} value={data.applicationType} selected={data.applicationType == router.query?.applicationType ? true : false} >{data.applicationType}</option>
                                )
                            }) : null}

                        </select>
                    </div>
                    <div className="grouped">
                        <label htmlFor="">From Date</label>
                        <input {...register('from_date')} type="date" defaultValue={router?.query?.from_date} />
                    </div>
                    <div className="grouped">
                        <label htmlFor="">To Date</label>
                        <input {...register('to_date')} type="date" defaultValue={router?.query?.to_date} />
                    </div>
                    <div className="grouped">
                        <label htmlFor="">Application ID</label>
                        <input {...register('applicationId')} defaultValue={router?.query?.applicationId} type="text" />
                    </div>
                    <div className="grouped">
                        <label htmlFor="">&nbsp;</label>
                        <input type="submit" id="cype_filter_btn" defaultValue="Search Logger" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Filterbar;