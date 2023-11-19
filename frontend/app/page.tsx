"use client"
import Image from 'next/image'
import HorizontalBar from './htlc_bar'
import { useEffect, useState } from 'react'
import ExponentialSlider from './bitcoinpriceslider'
import Slider from '@mui/material/Slider'

export default function Home() {
  const [percentage, setPercentage] = useState(30)
  const [blockFeeRate, setBlockFeeRate] = useState('128')
  const [htlcAmount, setHtlcAmount] = useState('100000')
  const [onChainFee, setOnChainFee] = useState(0)
  const [bitcoinPrice, setBitcoinPrice] = useState(35000)

  useEffect(() => {
    const vbytesPerHtlc = 500
    const blockFee = parseInt(blockFeeRate) * vbytesPerHtlc
    const percentFee = blockFee * 100 / parseInt(htlcAmount)
    console.log('percentFee', percentFee, blockFee, parseInt(htlcAmount))
    setOnChainFee(blockFee)
    setPercentage(percentFee)

  }, [blockFeeRate, htlcAmount])

  return (
    <>
      <div className="flex flex-col items-center mx-auto mt-8 w-4/5">
        <div>Post Bitcoinization</div>
        <div>Visualizing Bitcoin's inevitable high-fee environment</div>
        <div className="w-full">
          <label>Onchain Fees (sats/vByte): </label>
          <input type="text" value={blockFeeRate} onChange={(e) => setBlockFeeRate(e.target.value)} className="text-black rounded-md" placeholder="Enter block fee in sats/vbyte" />
          <Slider
            min={1}
            max={500}
            step={1}
            value={parseInt(blockFeeRate)}
            onChange={(event, newValue) => setBlockFeeRate(newValue.toString())}
            valueLabelDisplay="off"
            aria-labelledby="non-linear-slider"
            color="warning"
          ></Slider>
        </div>

        <div className="w-full">
          <label>Bitcoin price (present-day purchasing power): </label>
          <input type="text" value={"$" + Math.round(bitcoinPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="text-black" />
          <ExponentialSlider value={bitcoinPrice} onChange={setBitcoinPrice} />
        </div>
        <div>
          Fees for a typical 250vByte transaction are {parseInt(blockFeeRate) * 250} sats or ${(parseInt(blockFeeRate) * 250 * bitcoinPrice / 100000000).toLocaleString('en-US')}
        </div>
        <div>
          <label>LN Payment amount (sats): </label>

          <input type="text" value={htlcAmount} onChange={(e) => setHtlcAmount(e.target.value)} className="text-black rounded-md" placeholder="Enter HTLC amount in sats" />
        </div>
        <div>
          <label>HTLC vbytes: 500</label>
        </div>
        <div>
          <label>HTLC total onchain fee (Fee sats/vB * vB/HTLC): {onChainFee} sats</label>
        </div>
        <HorizontalBar leftPercentage={percentage} />

      </div>
    </>
  )
}