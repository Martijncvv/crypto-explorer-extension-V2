import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './popup.css'

import { amountFormatter } from '../utils/amountFormatter'
import { fetchCoinInfo, fetchNftInfo } from '../utils/api'
import { getDarkmode, getStoredCoins } from '../utils/storage'
import { IAdvancedCoinInfo } from '../models/ICoinInfo'
import { IAdvancedNftInfo } from '../models/INftInfo'

interface CoinData {
	assetPlatformId: string
	blockExplorerLink: string
	circSupply: number
	coingeckoLink: string
	contractAddress: string
	description: string
	icon: string
	id: string
	marketCapRank: string
	name: string
	price: number

	symbol: string
	telegramLink: string
	totalSupply: string
	twitterLink: string
	websiteLink: string
}

interface PriceData {
	price: string
	marketCap: string
	totalVolume: string
	ath: string
	atl: string
}

const App: React.FC<{}> = () => {
	const [quote, setQuote] = useState<string>('usd')
	const [apiStatus, setApiStatus] = useState<string>('Search a ticker')
	const [onchainActivity, setOnchainActivity] = useState<boolean>(false)
	const [displayNft, setDisplayNft] = useState<boolean>(false)
	const [nftData, setNftData] = useState<IAdvancedNftInfo>()
	const [darkmodeState, setDarkmodeState] = useState<boolean>(true)
	const [style, setStyle] = useState<string>('default')

	const onchainActivityPlatforms: string[] = [
		'ethereum',
		'binance-smart-chain',
		'polygon-pos',
		'fantom',
		'cronos',
		'avalanche',
		'celo',
	]

	const [coinData, setCoinData] = useState<CoinData>({
		name: '',
		id: '',
		icon: '',
		symbol: '',
		price: 0,
		marketCapRank: '',
		circSupply: 0,
		totalSupply: '',
		description: '',
		assetPlatformId: '',
		contractAddress: '',
		websiteLink: '',
		blockExplorerLink: '',
		coingeckoLink: '',
		twitterLink: '',
		telegramLink: '',
	})
	const [priceData, setPriceData] = useState<PriceData>({
		price: '',
		marketCap: '',
		totalVolume: '',
		ath: '',
		atl: '',
	})

	useEffect(() => {
		getDarkmodeState()
		getCoinData()
	}, [quote])
	useEffect(() => {
		getDarkmodeState()
	}, [darkmodeState])

	async function getDarkmodeState() {
		let darkmode = await getDarkmode()
		setDarkmodeState(darkmode)
		if (darkmode) {
			setStyle('darkmode')
		} else {
			setStyle('default')
		}
	}

	function searchCallback(): void {
		getCoinData()
	}

	async function getCoinData() {
		let coinIds = await getStoredCoins()
		console.log('coinIds')
		console.log(coinIds)
		setOnchainActivity(false)

		if (coinIds.length > 0) {
			setApiStatus(`Fetching ${coinIds[0].symbol.toUpperCase()}`)
			if (!coinIds[0].contract_address) {
				setDisplayNft(false)
				let coinInfo: IAdvancedCoinInfo = await fetchCoinInfo(coinIds[0].id)
				console.log('coinInfo')
				console.log(coinInfo)
				if (coinInfo.id != undefined && coinInfo.id != '') {
					console.log(coinInfo)
					setCoinData({
						name: coinInfo.name,
						id: coinInfo.id,
						icon: coinInfo.image.large,
						symbol: coinInfo.symbol,
						price: coinInfo.market_data.current_price.usd,
						marketCapRank: `${coinInfo.market_cap_rank}`,
						circSupply: coinInfo.market_data.circulating_supply,
						totalSupply: amountFormatter(coinInfo.market_data.total_supply),
						description: coinInfo.description.en,
						assetPlatformId: coinInfo.asset_platform_id,
						contractAddress: coinInfo.contract_address,

						websiteLink: coinInfo.links.homepage[0],
						blockExplorerLink: coinInfo.links.blockchain_site[0],
						coingeckoLink: `https://www.coingecko.com/en/coins/${coinInfo.id}`,
						twitterLink: coinInfo.links.twitter_screen_name,
						telegramLink: coinInfo.links.telegram_channel_identifier,
					})

					if (onchainActivityPlatforms.includes(coinInfo.asset_platform_id)) {
						setOnchainActivity(true)
					}

					if (quote === 'usd') {
						setPriceData({
							price: `$${amountFormatter(
								coinInfo.market_data.current_price.usd
							)}`,
							marketCap: `$${amountFormatter(
								coinInfo.market_data.market_cap.usd
							)}`,
							totalVolume: `$${amountFormatter(
								coinInfo.market_data.total_volume.usd
							)}`,
							ath: `$${amountFormatter(coinInfo.market_data.ath.usd)}`,
							atl: `$${amountFormatter(coinInfo.market_data.atl.usd)}`,
						})
					} else {
						setPriceData({
							price: `₿${amountFormatter(
								coinInfo.market_data.current_price.btc
							)}`,
							marketCap: `₿${amountFormatter(
								coinInfo.market_data.market_cap.btc
							)}`,
							totalVolume: `₿${amountFormatter(
								coinInfo.market_data.total_volume.btc
							)}`,
							ath: `₿${amountFormatter(coinInfo.market_data.ath.btc)}`,
							atl: `₿${amountFormatter(coinInfo.market_data.atl.btc)}`,
						})
					}

					setApiStatus(`Fetch success`)
				} else {
					setApiStatus(`Fetch error`)
				}
			} else {
				setQuote('usd')
				let nftInfo: IAdvancedNftInfo = await fetchNftInfo(coinIds[0].id)
				if (nftInfo.id != undefined && nftInfo.id != '') {
					console.log('nftInfo')
					console.log(nftInfo)
					setNftData({
						id: nftInfo.id,
						contract_address: nftInfo.contract_address,
						asset_platform_id: nftInfo.asset_platform_id,
						name: nftInfo.name,
						image: nftInfo.image,
						description: nftInfo.description,
						market_cap: nftInfo.market_cap,
						floor_price: nftInfo.floor_price,
						volume_24h: nftInfo.volume_24h,
						floor_price_in_usd_24h_percentage_change:
							nftInfo.floor_price_in_usd_24h_percentage_change,
						number_of_unique_addresses: nftInfo.number_of_unique_addresses,
						number_of_unique_addresses_24h_percentage_change:
							nftInfo.number_of_unique_addresses_24h_percentage_change,
						total_supply: nftInfo.total_supply,
					})
					setDisplayNft(true)

					setApiStatus(`Fetch success`)
				} else {
					setApiStatus(`Fetch error`)
				}
			}
		}
	}
console.log('coinData: ', coinData)
	return (
		<div id={style}>

			<h1> TESTESTTTT</h1>


		</div>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
