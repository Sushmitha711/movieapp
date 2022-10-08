import { Pagination } from "@material-ui/lab";


const CustomPagination = ({setpage,numOfPages=10}) => {

    const handlePageChange=(page)=>{
        setpage(page);
        window.scroll(0,0)
        
    }
    return (
        <div style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            marginTop:10,
        }
        }>
            <Pagination count={numOfPages} onChange={(e)=>handlePageChange(e.target.textContent)}
            color="primary"/>
        </div>
    );
}

export default CustomPagination;
