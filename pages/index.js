import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { isArray, isEmpty } from "lodash";



import Posts from '../src/components/post';
import Pagination from '../src/components/pagination';
import { handleGetAllUnique, cleanObj, updateData } from '../utils/services';
import { postData } from "../utils/middleware";

import Topbar from "../src/components/topbar";
import Filterbar from "../src/components/filterbar.js";
import Sortbar from "../src/components/sortbar";
import Loader from "../src/components/loader";

export default function Home() {
  const router = useRouter()
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true)
  const [allposts, setallposts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionTypeSelector, setActionTypeSelector] = useState([])
  const [applicationTypeSelector, setApplicationTypeSelector] = useState([])
  const [postsPerPage] = useState(10);

  useEffect(() => {
    setLoader(true)
    const query = {
      ...router.query,
    }
    if (router.isReady) {
      fetchPosts(query);
      setLoader(false)
    }
  }, [router.isReady, router]);


  const fetchPosts = async (query) => {
    postData().then(async (res) => {
      setallposts(res.result.auditLog)
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

  const handlePost = data => setPosts(data)
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      <main>
        <Topbar />
        <Filterbar actionTypeSelector={actionTypeSelector} applicationTypeSelector={applicationTypeSelector} />
        <div className="table">
          <Sortbar handlePost={handlePost} allposts={allposts} />
          {!isEmpty(currentPosts) && isArray(currentPosts) ?
            <>
              <Posts posts={currentPosts} />
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
            : (
              <>
                {
                  loader ? (
                    <Loader />
                  ) : (
                    <div className="noResult"> No result..</div>
                  )
                }
              </>
            )}
        </div>
      </main>
    </>
  )
}
