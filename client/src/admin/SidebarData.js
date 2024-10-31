import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export  const SidebarData=[
    {
        title:" Home",
        path:"/",
        icon:<AiIcons.AiFillHome  />,
        cName:"nav-text"
    },
    {
        title:"Report",
        path:"/report",
        icon:<FaIcons.FaGraduationCap/>,
        cName:"nav-text"
    },
    {
        title:"Create Questions",
        path:"/question",
        icon:<FaIcons.FaPen/>,
        cName:"nav-text"
    }
]