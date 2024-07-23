"use client";

import { DateToUTCDate } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import {ColumnDef, flexRender,getCoreRowModel,useReactTable} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { GetTransactionHistoryResponseType } from '@/app/api/transactions-history/route';
import SkeletonWrapper from '@/components/SkeletonWrapper';

interface Props{
    from:Date;
    to:Date;
}

const emptyData :any[] =[];
type TransactionHistoryRow = GetTransactionHistoryResponseType[0]



export const columns:ColumnDef<TransactionHistoryRow>[] =[
    {
        accessorKey: "category",
        cell:({row})=> (
            <div className='flex gap-2 capitalize'>
                {row.original.categoryIcon}
                <div className="capitalize">
                    {row.original.category}
                </div>
            </div>
        ),
    },

];  

function TransactionTable({from,to}:Props) {

    const history = useQuery<GetTransactionHistoryResponseType>({
        queryKey: ["transactions","history",from,to],
        queryFn: () => fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(res => res.json())
    })

    const table = useReactTable({
        data:history.data || emptyData,
        columns,
        getCoreRowModel:getCoreRowModel(),
    })
  return (
    <div className="w-full">
        <div className="flex flex-wrap items-end justify-between gap-2 py-4"></div>
        <SkeletonWrapper isLoading={history.isFetching}>
            <Table>
                hello
            </Table>
        </SkeletonWrapper>
    </div>
  )
}

export default TransactionTable
