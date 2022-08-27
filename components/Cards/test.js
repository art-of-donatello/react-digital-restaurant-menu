import React,{useState,useEffect} from 'react'
import uuid from 'react-uuid';
import _ from 'lodash'

function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    var temp = list.slice(0);
    //var temp = [].concat(list);
    console.log(list)
    console.log("temp:")
    console.log(temp);
    
    for (i = 0; i < list.length; i += 1) {
      map[temp[i].id] = i; // initialize the map
     // list[i].children = []; // initialize the children
      temp[i].children = []; // initialize the children
    }
    
    for (i = 0; i < list.length; i += 1) {
      node = temp[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
       // list[map[node.parentId]].children.push(node);
        temp[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    console.log("roots:")
    console.log(roots)
   list.map((e)=>{e.children=null})
    console.log(temp)
    return roots;
  }


 function unflatten( array, parent, tree ){
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: 0 };
        
    //var children = Array.filter( array, function(child){ return child.parentId == parent.id; });
    var children =array.filter((child)=>child.parentId==parent.id);
    if(  children.length>0  ){
        if( parent.id == 0 ){
           tree = children;   
        }else{
           parent['children'] = children
        }
        children.map( ( child )=>{ unflatten( array, child ) } );                    
    }
    
    return tree;
}

function copy(array) {
    return array.map((arr)=>arr);
  }
function Test() {
    const [data,setData] = useState([]);


      
      var entries = [{
          "id": "12",
          "parentId": "0",
          "text": "Man",
          "level": "1",
          "children": null
        },
        {
          "id": "6",
          "parentId": "12",
          "text": "Boy",
          "level": "2",
          "children": null
        },
        {
          "id": "7",
          "parentId": "12",
          "text": "Other",
          "level": "2",
          "children": null
        },
        {
          "id": "9",
          "parentId": "0",
          "text": "Woman",
          "level": "1",
          "children": null
        },
        {
          "id": "11",
          "parentId": "9",
          "text": "Girl",
          "level": "2",
          "children": null
        }
      ];
 
const veri =entries.map( (child)=>_.clone(child )) ;
      useEffect(()=>{
        
       console.log( unflatten(veri));
      console.log(entries);
      },[])

     
  


      const addItem = (e) => {
        e.preventDefault();
        const newItem = e.target.name.value;
        entries.push({
            "id": uuid(),
            "parentId": newItem,
            "text": "Girl",
            "level": "2",
            "children": null
        });
        setData(list_to_tree(entries));
        console.log("entries:")
        console.log(entries)
        console.log("data:")
        console.log(data)

      }
  return (
    <div>test
        <form >
        <input type="text" name="name" />
        <button type="submit" onClick={()=>addItem()} >asdasd</button>
        </form>
    </div>
  )
}

export default Test