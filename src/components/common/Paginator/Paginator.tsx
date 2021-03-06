import React, {useState} from "react"
import s from "./Paginator.module.css"
import cn from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged?: (pageNumber: number) => void
    currentPage?: number
    partitionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount,
                                      pageSize,
                                      onPageChanged = x => x,
                                      currentPage= 1,
                                      partitionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let partitionCount = Math.ceil(pagesCount / partitionSize)
    let [partitionNumber, setPartitionNumber] = useState(1)
    let leftPartitionPageNumber = (partitionNumber - 1) * partitionSize + 1
    let rightPartitionPageNumber = partitionNumber * partitionSize
    return (
            <div className={cn(s.paginator)}>
                {partitionNumber > 1 &&
                <button onClick={() =>{setPartitionNumber(partitionNumber - 1)}}>Prev</button>}
                {pages
                    .filter(p => p>= leftPartitionPageNumber && p<=rightPartitionPageNumber)
                    .map(p => {
                    return <span onClick={(e) => {
                        onPageChanged(p)
                    }} className={cn({[s.selectedPage]
                            : currentPage === p}, s.pageNumber)} key={p}>{p}</span>
                })}
                {partitionCount > partitionNumber &&
                <button onClick={() => {setPartitionNumber(partitionNumber +1)}}>Next</button>}
            </div>
    )
}

export default Paginator