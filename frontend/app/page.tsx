"use client"
import Image from 'next/image'
import HorizontalBar from './htlc_bar'
import { useEffect, useState } from 'react'

export default function Home() {
  const [percentage, usePercentage] = useState(30)
  const [blockFeeRate, setBlockFeeRate] = useState('128')
  const [htlcAmount, setHtlcAmount] = useState('55000')

  useEffect(() => {
    const vbytesPerHtlc = 500
    const blockFee = parseInt(blockFeeRate) * vbytesPerHtlc
    const percentFee = blockFee * 100 / parseInt(htlcAmount)
    console.log('percentFee', percentFee, blockFee, parseInt(htlcAmount))
    usePercentage(percentFee)

  }, [blockFeeRate, htlcAmount])

  return (
    <>
      {/* <div>
        <input type="range" min="0" max="100" value={percentage} onChange={(e) => usePercentage(parseInt(e.target.value))} />
      </div> */}

      <div>
        <input type="text" value={blockFeeRate} onChange={(e) => setBlockFeeRate(e.target.value)} className="text-black" placeholder="Enter block fee in sats/vbyte" />
      </div>

      <div>
        <input type="text" value={htlcAmount} onChange={(e) => setHtlcAmount(e.target.value)} className="text-black" placeholder="Enter HTLC amount in sats" />
      </div>
      <HorizontalBar leftPercentage={percentage} />
    </>
  )
}