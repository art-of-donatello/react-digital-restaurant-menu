import React,{useState,useEffect} from "react";

import { useRouter } from "next/router";
import axios from "axios";
import CardProduct from "components/Cards/Menu/CardProduct";
import { useSelector,useDispatch } from "react-redux";
import {getMenu as defaultMenu,menuState } from 'redux/menuSlicer'
export default function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [menu,setMenu]=useState([]);
    const defmenu = useSelector(state => state.menu.menu);
   
   

    const getMenu = async() => {
        setLoading(true);
     const menu =    await axios.post('/api/getMenu', {url:data.query.slag}).then(
        setLoading(false)
     )
     return menu.data.message;
        };
        const createUrl= (id)=>{

            const myArray =id.split("-");
        return myArray[0]
        }
        

        const createMenu=(url,menu)=>{
        
            if(url.length>1){
  


                for(var i=1; i<url.length;i++){
                  
                    
                   menu = menu.filter((item)=>item.text+createUrl(item.id)==url[i])
                  
                   menu = menu[0].children
                    
                    
                }
                return menu;
            }
                
            return menu;
                
        }
const data=useRouter();







useEffect(() => {
  
  defmenu.length==0? dispatch(defaultMenu(data.query.slag)):null
  //getMenu().then(res=>setMenu(res))
        
    
}, [])

useEffect(() => {

  const res =defmenu.length==0?[]: createMenu(data.query.slag,defmenu)

    setMenu(res)
} , [defmenu])

return (<>
{loading?(<div>Loading</div>):
(<CardProduct menu={menu} url={data.query.slag}/>)
}
</>)



}