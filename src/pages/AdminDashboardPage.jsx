import React, { useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";

const AdminDashboardPage = () => {
  const { dispatch } = React.useContext(AuthContext);

  const [video, setVideo] = useState([])
  const [page, setPage] = useState(1)
  const [total, settotal] = useState([])
  function makebtn(pages) {
    let array = []
    for (i = 1; i <= pages; i++) {
      array.push(i)
    }
    settotal(array)
  }
  useEffect(() => {
    console.log("chal raha hai")
    let sdk = new MkdSDK();
    let payload = {
      payload: {},
      page: page,
      limit: 10
    }
    sdk.callRestAPI(payload, "PAGINATE")
      .then((response) => {
        if (response) {
          console.log(response, "kkkkkk")
          if (response?.list) {
            setVideo(response?.list)
            let array = []
            for (let i = 1; i <= response?.num_pages; i++) {
              array.push(i)
            }
            console.log(array, "doneee")
            settotal(array)
          } else {

          }
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });

  }, [page])
  return (
    <>
      {/* <div className="w-full  flex justify-center items-center text-7xl h-screen text-gray-700 "> */}
      <div className="main-black px-5 py-5">
        <div className="main-black px-5">
          <div className="main-black px-5">

            <div className="w-full d-flex justify-content-between my-5 ">
              <p className="heading-app">APP</p>
              <button onClick={() => {
                dispatch({ type: 'LOGOUT', payload: {} })
              }} className="lg-btn">Logout</button>

            </div>
            <div className="w-full  ">
            <div className="v-dive ">
                  <div className="d-flex evenly py-auto align-center">

                    <div className="w-10"><p> S no</p></div>

                    <div className="w-20" ><p>Images</p></div>

                    <div className="w-50"><p>Title</p></div>
                    <div className="w-10"><p>User</p></div>
                    <div className="w-10"><p>Likes</p></div>

                  </div>
                </div>
              {video.map((item, key) => (
                <div className="v-div ">
                  <div className="d-flex evenly py-auto align-center">

                    <div className="w-10"><p> {item.id}</p></div>

                    <div className="w-20" ><img style={{ borderRadius: "12px", height: "80px" }} src={item.photo} alt="Item" /></div>

                    <div className="w-50"><p> {item.title}</p></div>
                    <div className="w-10"><p> {item.username}</p></div>
                    <div className="w-10"><p> {item.like}</p></div>

                  </div>
                </div>
              ))}


            </div>
            {/* <div className="v-div "> */}
            <div className="d-flex evenly py-auto">
              {total.map((item, key) => (
                <div className="px-5">


                  <button onClick={() => { setPage(item) }} className="pagination-btn" >{item}</button>



                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>


      {/* </div> */}
      {/* <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div> */}
    </>
  );
};

export default AdminDashboardPage;
