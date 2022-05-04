import React from 'react';
import { useEffect, useState } from "react";
import { isArray, isEmpty } from "lodash";
const Posts = ({ posts }) => {


    const Accordion = ({ title, children, titleOpen }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <div className={`column first ${isOpen ? 'active' : ''}`} >
                    <div className="top" onClick={() => { setIsOpen(!isOpen) }}>{title}</div>
                    {/* for Mobile */}
                    <div className={`expand`}>
                        {children}
                    </div>
                </div>
            </>

        );
    };

    return (
        <>
            <ul className='list-group mb-4'>
                {!isEmpty(posts) & isArray(posts) ? posts.map((post, index) => (

                    <div key={index} className="row">
                        <Accordion title={post.logId}>

                            <ul>
                                <li>
                                    <span>Application Type</span>
                                    <span>{post.applicationType}</span>
                                </li>
                                <li>
                                    <span>Application ID</span>
                                    <span>{post.applicationId}</span>
                                </li>
                                <li>
                                    <span>Action</span>
                                    <span>{post.actionType}</span>
                                </li>
                                <li>
                                    <span>Action Details</span>
                                    <span>-/-</span>
                                </li>
                                <li>
                                    <span>Date:Time</span>
                                    <span>2022-02-04 / 00:02:16</span>
                                </li>
                            </ul>

                        </Accordion>

                        <div className="column">{post.applicationType}</div>
                        <div className="column">{post.applicationId}</div>
                        <div className="column">{post.actionType}</div>
                        <div className="column">-/-</div>
                        <div className="column">{post.creationTimestamp}</div>
                    </div>


                )) : (
                    <div className='nodata'>No Data</div>
                )}
            </ul>

        </>
    );
};

export default Posts;