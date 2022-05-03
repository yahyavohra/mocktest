import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Posts from '../src/components/post';
import Pagination from '../src/components/pagination';
import { useForm } from 'react-hook-form';
import { isArray, isEmpty } from "lodash";
import { handleGetAllUnique, cleanObj, updateData } from '../utils/services';
import { postData } from "../utils/middleware";

export default function Home() {
  const router = useRouter()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [actionTypeSelector, setActionTypeSelector] = useState([])
  const [applicationTypeSelector, setApplicationTypeSelector] = useState([])
  const [mobileToggle, setMobileToggle] = useState(false)

  const fetchPosts = async (query) => {

    postData().then(async (res) => {
      const updatequery = await updateData(cleanObj(query), res.result.auditLog)
      setPosts(updatequery)
      setActionTypeSelector(handleGetAllUnique(res.result.auditLog, 'actionType'))
      setApplicationTypeSelector(handleGetAllUnique(res.result.auditLog, 'applicationType'))
    }).catch((err) => {
      console.log(err.response)
    })

  };


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    const query = {
      ...router.query,
    }
    setMobileToggle(false)
    if (router.isReady) {
      fetchPosts(query);
    }
  }, [router.isReady, router]);




  /* handling -  `Sorting column Assending and decending onchange` */
  const handleSort = (key) => {
    const sortedData = [...posts].sort((a, b) => {
      return a.key > b.key ? 1 : -1
    })
    setPosts(sortedData)
  }



  const onSubmit_handle = async (value) => {
    var cleanValue = cleanObj(value)
    router.push({
      query: cleanValue
    }, undefined, { shallow: true })

  };




  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      <main>
        <div className="breadcrumbs">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Administration</a>
            </li>
            <li>logger Search</li>
          </ul>
        </div>
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
              <select   {...register('actionType')} >
                <option></option>
                {actionTypeSelector.length ? actionTypeSelector.map((data, index) => {
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
                {applicationTypeSelector.length ? applicationTypeSelector.map((data, index) => {
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
              <input type="submit" defaultValue="Search Logger" />
            </div>
          </form>
        </div>
        <div className="table">
          <div className="row">
            <div className="column">
              <div className="top">Log ID</div>
            </div>
            <div className="column">Application Type
              <a onClick={() => { handleSort('applicationType') }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 476.492 476.492"
                  style={{ enableBackground: "new 0 0 476.492 476.492" }}
                  xmlSpace="preserve"
                >
                  <polygon points="253.246,339.952 253.246,0 223.246,0 223.246,339.952 101.707,339.952 238.246,476.492 374.785,339.952 " />
                </svg>
              </a>
            </div>
            <div className="column">Application ID</div>
            <div className="column">Action</div>
            <div className="column">Action Details</div>
            <div className="column">Date:Time</div>
          </div>
          {!isEmpty(currentPosts) && isArray(currentPosts) > 0 ?
            <>
              <Posts posts={currentPosts} loading={loading} />
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>

            : (
              <div className={`loader-container  `}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}


        </div>
      </main>



    </>
  )
}
