filteredData.slice(0, 10).map((obj) => {
    return (
        <Link key={obj.id} className="dataItem" to={`/users/${obj.id}`} onClick={()=> {clearInput()}}>
            <p>{obj.firstName + ' ' + obj.lastName}</p>
        </Link>
    )
})