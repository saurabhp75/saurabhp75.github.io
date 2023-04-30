---
title: "Crypto Trading"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Trading", "Crypto"]
draft: true
description: "Introduction to Crypto Trading"
---

# HODLing When to exit

- Don't hold anything that's below the 200 day moving average. This implies a fundamental flaw or a cyclic correction. At this point, no one knows where the bottom is.

# Margin trading in Binance

- Margin trading is built into Binance.
- Here we borrow from other users who provide liquidity. We pay hourly interest on the borrowed amount.

The fund in your margin wallet is called `margin`. It acts as a collateral. There are two types of margin trading in Binance. In first your margin is in USD and in other your margin is in coin/BNB.

Leverage = (Borrowed fund) % margin fund.

## What is 3x, 5x or 10x in Binance

- It means you can trade with 3x, 5x or 10x of your fund in margin account.
- For eg. If you go for 3x leverage in Binance you have to borrow 2x of your margin balance.

In Binance Cross and Isolated margin have different wallets.

- `Cross margin trading`: Entire margin is shared across all open positions. Profit of one position can balance out loss in other. But it is not safe as your entire balance is at stake and can be liquidated.

- `Isolated margin trading`: Every open position has its own margin. It is confined to one trading pair for eg `BTCUSDT`. So while transferring fund to your isolated margin wallet you have to specify the pair you want to trade on.

### Normal, Borrow and Repay radio buttons in Binance

- `Normal`: Nothing is borrowed automatically, we have to first do it manually.

- `Borrow`: When you open a trade, the amount will be automatically borrowed if your funds are less. When an open order with borrowed amount is closed the pricipal is automatically paid. When clicked, you can borrow from the profits of other open positions(in cross margin?) . You can also borrow manually and specify how much you want to borrow. The max amount that can be borrowed is limited by leverage.

- `Repay`: Automatically pays the debt when we close our position. In case of manual repay interest will be accrued till we repay manually.

### Total balance, Total debt and Equity

- `Total Balance`: The amount of balance you have including the balance and open positions.
- `Total debt`: The borrowed amount plus the interest. Interest is in same currency as debt.
- `Equity`: Total balance minus the total debt. This is what we get if we repay our debts now. This is our `collateral`.
- `Margin risk`: It is otal balance/total debts. If it reaches _1.3_ we receive a margin call asking to pay debt. When it reaches 1.1 our position is liquidated.

In margin trading(usdt margin)we can borrow a coin against our usdt margin and later sell/short it.

### USDT margin

- `Playing long`: you buy the coin using borrow option and sell using repay option.

- `Playing short`: you sell the coin using borrow option. Then you buy the coin using repay option.

# Future trading in Binance

Market orders are used only if gettng out is priority as they have slippages in volatile market.

Future is a derivative.

`Derivatives`: Financial assets whose value is derived from other assets or group of assets for eg bitcoin.
Future is a contract between buyer and seller and delivery is in future. In perpetual future contract there is no expiry.

`Funding rate` : it is positive in a bullish market and negative in bearish market. When positive buyers have to pay the funding rate. Calculated as difference between contract price and index price multiplied by funding rate.

Unrealised PNL calculated based on the `mark price`.

## Types of future trading in Binance

- `USD M` : Here collateral is a stable coin. Profit and loss is in stable coin.

- `Coin M`: Here collateral is a crypto like bitcoin. Profit and loss is also in crypto base asset/collateral.

- `Cross Margin`:

- `Isolated Margin`:

`Maintenance margin`: minimum value of margin balance required to keep your positions open.

`Margin balance`: futures account balance + unrealised pnl from open positions. When margin balance falls below maintenance margin your position is **liquidated**.

`Margin ratio/risk`: maintenance margin divided by margin balance. When it reaches 100 your ALL your positions are liquidated. Liquidation has additional fees so avoid it!!

## Position mode in future trading

- `One way mode`: One contract can hold positions in one direction.
- `Hedge mode`: One contract can hold positions in both long and short directions at the same time and hedge positions in different directions under the same contract.

Reduce only option: This order will be executed only if it reduces the current position in one way mode.

- `Stop market order`: executes a market order at a given price. Used for tp and sl.here you only specify the stop price and not the order price as it is market price.

`Limit order`: used for take profit.

`Stop limit`: used for stop loss.

Above is better and have much control.

Trigger in orders: last price, mark price.

`TIF`: Time in force,

`GTC`: Good till cancelled.Remains till fulfilled or cancelled.

`IOC`: Immediate or cancel. Part order may get filled and other part will be cancelled.

`FOK`: Fill or kill. If entire order is not executed immediately then it will be cancelled.

`Post only`: same as limit order but it will not get executed against existing order. It will be first added to the order book first then will be executed. It saves fees as maker fees is applied.

`Trailing stop`: Lock in profits and limit the losses. Stop loss moves with the price. It is not recommended as stop loss should be set according to support and resistance (price action).

## Binance hedge mode

Contract: for eg. BTCUSD perpetual

## To reduce the risk and protect your profits.

Two short/long term positions

## Making short term gains.

One long term and one short term position.

`Hedging`: holding long and short position for the same contract.

In one way mode opening an opposite position will reduce an existing position and opening a same position will increase existing position.

You can protect large investment from downside move by have a short futures contract.

In hedge mode there is an option to close an open long/short position.

## Trailing stop

Used in futures to lock-in profits and limit your losses.

First set a long position. Then set a trailing stop order in opposite side(short). The activation price should be the price from which you want to lock profits. When the price is hit the trailing stop order is activated which will execute when the trailing stop is hit which is in percentage of the price.

Use case of trailing stop. To set the exit point from a futures contract. Ensuring profits.

Use case 2: when price is rising/falling sharply you buy/sell it immediately. And place a trailing stop order. At a point till which the price will move without moving in opposite direction.

## Reduce only option

- This order will be executed only if it reduces the current position in one way mode.

## Stop market order

- Executes a market order at a given price. Used for tp and sl.
- Here you only specify the stop price and not the order price as it is market price.

- `Limit order`: used for take profit.
- `Stop limit`: used for stop loss.

Above is better and have much control.

## Trigger option in orders

- `last price`
- `mark price`

## Options in orders

- `TIF`: Time in force
- `GTC`: Good till cancelled.Remains till fulfilled or cancelled.
- `IOC`: Immediate or cancel. Part order may get filled and other part will be cancelled.
- `FOK`: Fill or kill. If entire order is not executed immediately then it will be cancelled.
- `Post only`: same as limit order but it will not get executed against existing order. It will be first added to the order book first then will be executed. It saves fees as maker fees is applied.
- `Trailing stop`: lock in profits and limit the losses. Stop loss moves with the price. It is not recommended as stop loss should be set according to support and resistance (price action).

## Binance hedge mode

Contract: for eg. BTCUSD perpetual

### To reduce the risk and protect your profits.

Two short/long term positions

### Making short term gains.

One long term and one short term.

Hedging: holding long and short position for the same contract.

In one way mode opening an opposite position will reduce an existing position and opening a same position will increase existing position.

You can protect large investment from downside move by have a short futures contract.

In hedge mode there is an option to close a open long/short position.

## Trailing stop

- Used in futures to lock-in profits and limit your losses.

- First set a long position. Then set a trailing stop order in opposite side(short). The activation price should be the price from which you want to lock profits. When the price is hit the trailing stop order is activated which will execute when the trailing stop is hit which is in percentage of the price.

- Use case of trailing stop. To set the exit point from a futures contract. Ensuring profits.

- Use case 2: when price is rising/falling sharply you buy/sell it immediately. And place a trailing stop order. At a point till which the price will move without moving in opposite direction.

## Binance Mobile app

## indicators

MA:

## Used to:

MACD:
Trend following and momentum of trend.

It is used in trading trends and not useful in trading ranges.

## Margin trading Vs Future trading in Binance

Main difference is in the assets being traded in futures we trade contract.

Margin orders are spot orders so you have to borrow and pay interest.

In margin trading leverage is smaller.

In margin trading the trading fees is less as you have to also pay for interest.

In future trading the trading fees is higher and for perpetual contract you have to pay funding rate. Funding rate ensures convergence of price between perpetual futures market and underlying asset.

In perpetual future the contract price is based on index price, which is based on average price in various markets and volume.

## Prepare a plan to trade in common scenarios and what indicators are required in each one of them

- Uptrend:
- Downtrend:
- Ranging:

## Important points to remember

- Always trade with the trend: Look for buying opportunities in uptrend and shorting opportunities in downtrend.
  Identify trend in higher time frame and confirm in lower time frame and trade with the trend.

- `Pick small trade`: Risk should not be more than 2% of your account.

- `Stoploss`: Don't have too tight, it should be 2 times the ATR to take care of market volatility.

- `Money management`: RR ratio for a trade should be 1:2.

## Trading workflow

- `Identify the trend`: Identify if it's an uptrend, downtrend or a range movement. Draw lines

- `Identify S/R`: Draw lines.

- `Look for areas of value`:

- Identify following three components of our trade:

1. Entry Triggers as per your trading technique
2. Established invalidation levels (Stop loss)
3. Defined reversals (Profit taking)

# Tech analysis

## Candle stick charts

- `Small body`: Most trade happened in narrow range.

- `Large body`: Green body means FOMO, red means FUD.

## Uses of candle stick pattern

- Identify pattern (bearish or bullish) reversals. Thus giving a signal.

## Bullish candle stick pattern

- `Bullish engulfing pattern`: When a red candle is fully engulfed by a green candle. It is even more stronger if the green candle engulfs more than one red candle.

  38.2 percent candle.

- `Hammer`: small body with very small upper wick and very long lower wick. Look for other indicators as well for eg a green candle following it.

- `Morning doji(+)`: Red candle followed by doji which is followed by a green candle which closes above the half of the red candle. Signal is even more stronger if the green candle closes above the opening of red candle.

## Bearish candle stick pattern

- `Bearish engulfing pattern`: When a green candle is fully engulfed by a red candle. It is even more stronger if the red candle engulfs more than one green candle.

- `Dark cloud cover`: A green candle followed by a red candle opening at a high and closing below mid of the green candle. It is confirmed by a following smaller red candle.

- `Shooting star`: A red candle with a small body, large upper wick and small lower wick. It should be preceded by green candle and followed by red candle. When found in an uptrend it may signal it's end.

- Identify market sentiment.

- Identify entry into trend continuation trade.

`Candle stick` can tell more than price action, they can tell whether traders are buying the dip or taking profits.

- `Long bottom wick`: traders are buying the dip. Price could still be bullish.

- `Long top wick`: traders are itching to take profits. There could be a shakeout.

Close above or below candle.

Trading volume should be taken into consideration in candle chart analysis.

Low volume in a coin indicates future volatility, ie price moving up or down.

A coin should have good volume in shorter time frames. Trade in such coins.

If volume is decreasing with price drop that means bulls are holding and once price drops to desired level, volatility kicks in and the price could rise.
Also, If volume is decreasing with price rise that means bears are holding and once price rise to desired level, volatility kicks in and the price could drop.

Draw lines to find `support`, `resistance` and `price patterns`.

## Price patterns:

`Symmetrical/Ascending/Descending triangle`. The price change at convergence can be calculated by height of triangle at left side.

## Technical indicators

Technical indicators change as per the time frame, keep this in mind!!

### Moving averages/MA/EMA

As it is a lagging indicator, it won't warn in advance but can confirm a trend change.

- MA is used for identification of trend and confirmation of reversal. When market is above MA it's uptrend otherwise downtrend. Crossing of market with moving average signals trend reversal.

- MA are also used to identify areas of support and resistance. During downtrend MA gives resistance and during uptrend MA gives support. Otherwise it is ranging.

- Identify trend:

- Occasionally Identify support and generally for short term, 20 period MA may act as SR.

- Identify "possible" market changes: using crossover of two MA(double crossover). Also when the price aggressively crosses the MA, remember here that it must match longer term tren/MA to ensure that we are trading in the direction of the market.for day trading 10 and 50 can be used as short and long-term respectively.
  Sometimes 3 MA is used and the fastest one crosses(triple crossover) over can be taken as signal provided other indicators are also supporting. The crossover method is a lagging indicator.

Double exponential moving averages: they follow price more closely and have less lag.

`MA ribbon`: when it contracts it may indicate trend change. When they

`MA envelopes`: used for overbought or oversold scenario in sideways market movement.

It's a lagging indicator so it will give the signal a bit late. So generally aggressive traders don't use it for signal.

`Short term`: 5-20, 10 most popular.

`Mid term`: 20-60, 50 most common.

`Long term trade and investment`: 100 and more, 200 most common to identify bullish or bearish trend.

`Popular MA`: 10,20,50,100,200.

Traders use more than 1 MA, 50 and 200 is very popular among mid term traders. 200 gives them indication to move with the trend.

### MA duration commonly used:

- `Short term`: 10-20
- `Medium term`:50
- `Long term`: 200

### SMA Vs EMA

- SMA can be used for holding.
- EMA for price sensitive, volatile mkt or shorter time frames.

EMA put more weightage to recent price and react faster to price changes. 200 day EMA is used most often. If current price is below EMA line then it acts as resistance. If current price is above EMA line then it acts as support.

- `Death cross`: 20 day MA crosses 200 day MA from above. Indicates a severe downturn.

- `Golden cross`: Indicates a surge in price. Read

- `RSI`: Relative strength index, tells whether a coin is undervalued or overvalued on a scale of 0 to 100. Below 30, it's undervalued, time to buy.
  If above 70, overvalued, Time to sell. RSI trend line tells if a coin is moving towards undervaluation or overvaluation. When it's between 30 to 70 the price is right.

- `MACD`: Moving average convergence divergence.Use to find new trends in price and measure price volatility. When two MA lines lines are far apart price volatility is low and when they are close price volatility is high. If they cross then the price is going to change in coming hours and days. Direction of the bars will tell the direction the price will go.

- `Bollinger bands`: Used to measure market volatility. Wider band indicates more volatility and vice versa. Traders buy during low volatility and sell at high volatility if the price has moved upwards during that period. If the price moves out of band then time to buy or sell depending upon whether it's pushing beneath or piercing up.

- `TA Summary`: Candle stick tells whether traders are buying dips or taking profits. Drawing trend lines on candle stick gives pattern and tells where price is heading. Trading volume tells whether price action is genuine or not(strong or weak).

MA, MACD, RSI Bollinger bands gives perspective on volatility identify price bubble or buying opportunity, also possible crash and moonshot.

Check the timeframe you are working with. Also different coin needs different trading strategy. Also do fundamental analysis.

## Bull flag and bear flag

Idea behind bull/bear flag is that a strong medium term trend will eventually override weak short term trend. The strength of this indicator depends on (low) volume during short term trend. Breakout is detected by a candle breaking the pattern/range at the end of flag.

- Bull flag
- Bear flag

Wedges forms when two trendlines converge. Breakout is detected by a candle breaking the pattern/range at the convergence point. The idea behind it is that price has become too bullish/bearish and needs a correction in the larger time frame.

- `Rising wedge`: May look bullish but results in drop in price.

- `Falling wedge`:

Rise and fall after wedge convergence depends upon "height" of wedge at left.

All the three patterns below needs support and resistance levels. Which can be confirmed from moving averages.

Support and resistance levels are previous highs and psychologically comfortable positions for eg. 20k bitcoin price.

- `Double tops`: leads to decrease in price.

- `Double bottoms`:

- `Head and shoulders`: bearish sign. The consensus is that the left shoulder should have the highest volume, the head lesser and
  the right shoulder the least. In my experience, Low volume during Breakout could hint toward a back test soon. A high-
  volume breakdown might not see a retest immediately. The entry should be taken ONLY when the pattern is completed, not in an anticipation of a
  completion. Example of an anticipated pattern failure. The entry is made once the neckline breaks to the downside. See the example below. Wait for the
  pattern to completely form. Wait for the breach of the neckline. Enter only if the above 2 events
  occur.
  To avoid failes HS asttempt, do the following:

1. Waiting for a retest
2. High Volume break-out
3. High momentum Break-out: Previous support broken.

- `Fibonacci retracement indicator`: used to tell best time to buy and sell. 0.5 line
  Decide to sell (stop loss or profit making).

- Bitcoin dominance: on a downtrend since 2017. https://www.tradingview.com/symbols/CRYPTOCAP-BTC.D/

- Sentiment analysis: https://medium.com/hackernoon/sentiment-analysis-in-cryptocurrency-9abb40005d15

## Trading time frames:

- `Swing traders`: Work on timeframes of 1 day or longer.

- `Day trader`: Hourly time frame.

- `Scalp trader`: Time frame in minutes. Riskiest as it leads to overtrading. As we get mixed signals for price patterns.

Longer the Time frame the stronger is the trend.

## Trend

Trend is your friend.

Rules to Identify down/uptrend.

Trend loses momentum over time and mkt moves sideways.

`Uptrend`: Each subsequent high/low is higher than previous.

`Downtrend`: Each subsequent high/low is lower than previous.

Don't trade against the trend. Take buy trades for uptrend and sell trades for downtrend.

Support and resistance in uptrend and downtrend.

Entry/Exit in uptrend and downtrend.

### Indicators

`ATR indicator` : Average true range. Identifies volatility of the pair and time frame. Used to decide stop losses, otherwise you may get wicked out. Add 2 times the ATR to the stop loss target. Also maintain healthy RR ratio.

MA:

- Can be used to identify trend, depending upon whether current price is above or below moving average or not. 20 is a good period for short term trend. 50 and 100 are others.

- identify areas of value.

- extend the trailing stop.

RSI indicator:

### breakout pattern

- From low volatility to high volatility.

### Sentiment analysis

- Fear and greed index.
- Google trends: keywords bitcoin and crypto.

# Emperor tutorial

## Example trades

### Trade 1 (long entry)

1. Look for candles with a long tail.
2. It should have bounced off of a previous resistance now turned support.
3. Wait for the price to break a resistance above.

### Trade 2 (short entry)

1. Look for candle with long overhead wick.
2. Wait for previous support to be broken.

### Trade 3 (short entry)

1. Long overhead wick candles generally denote supply.
2. Wait for them to close at same level.
3. Find new support.
4. Wait for it to break.
5. Wait for support to turn into resistance.
6. Enter short trade upon confirmation.

## What is retest

- After a price breaks a certain resistance it comes back to the point where the resistance was
  to establish that the resistance has been broken and the same resistance has now been turned into a
  support for the price structure. Safe way is to enter long after succesful retest.

## Breakout

A Breakout occurs when the resistance line is tested several times, leading to an increased demand
in that price zone. This increase of demand leads to a breakout.

- `Opinion`: The more times a resistance is tested, the weaker it becomes.

## Breakdon

It is when the support zone is tested too many times, leading to an increase is supply at that price
point, which leads to lowering of price i.e. Breakdown.

- `Opinion`: The more times we test a support, the weaker it becomes.

## Support and resistance

Resistance lines, when crossed, become new support, and the cycle repeats until the trend breaks(breakdown).

# Trading using SR

## Following things need to be considered when trading using SR

1. Breakouts, Break-down
2. Fake Breakdown/Breakout (Used by institutional traders against retail traders)
3. Re-tests
4. Confirmations
5. Stop-loss hunting (Used by institutional traders against retail traders)

## Stop loss hunting

- Short hunting at resistance: Retail traders stop loss is hit as the price has a small/fake breakout at which institutional traders have put short.
- Long hunting at support: Retail traders stop loss is hit as the price has a small/fake breakdown at which institutional traders have put long.

## Solutions to stop loss hunting

1. Place the SL BELOW the invalidation point to avoid SL hunting by wicks.
2. Exit the trade on invalidation with using SL manually AFTER the invalidation is confirmed to avoid
   stop loss hunting.

## Fake Breakdown/Breakout

- Happens both at support and resistance levels.
- Retest and confirm (using previous SR) fake breakout and breakdown.

## Three components of a trade

1. `Entry trigger`: Reasons for entering a trade. There could be multiple reasons or a single reason for entry. Generally, a set of reasons AKA confluence is a higher probability trade and a generally a safer entry.
2. `Stop loss`: Stop loss is set at Invalidation level. Entry is made ONLY as per TA on a valid reason for a directional move. Once the reason for the entry
   has been lost, the trade must be exited.
3. `Target`: It is the possible price level that the asset might touch based on previous trends or confluence AND where a possible reversal could occur.

- `Invalidation level`: The event at which the reason for entry ceases to exist.

# Volume

- Low/high volume and low/high liquidity is a different concept.
- When we talk about low/high volume, we're taking in a `relative term`.
- A low volume refers to a volume lower than the average volume and vice versa for High volume.

Moving average of volume: Default is 20 but 14 can also be used.

## Why high volume is important

- An increase in volume denotes an increase in interest and buying/selling by holders of big funds (Institutions) AKA smart money.
- Smart money are the holders of higher capital and more information.
- `Conclusion`: Higher volume is equal to Smart money with more info and funds buying, hence it's an area of
  interest.

# Price action should be considered along with volume

- Notice sudden volume expansion at the resistance and support or breakout.
- Volume should always be compared with average volume as it is a relative thing.
- Set the moving average for volume.

## Bullish Divergence (RSI covered here)

- It helps traders identity divergence AND learn entry triggers.
- Remember, for bullish divergence, ONLY LOOK AT THE LOWS.

![Bullish divergence](/static/images/trading/bullish_divergence.jpg)

When Price makes a higher high, the momentum oscillator too should make a higher high. This is called `convergence`.

In a rare occurrence, the momentum oscillator and the price don't follow a similar path. This phenomenon is called `Divergence`.

Divergences are used to find a potential reversal on the larger time frame or a swing/scalp opportunity on the lower time frame.
A minimum of 4-hour time frame is preferred. Since they may fail (very rarely) it is better to accompany the entry with further confirmations.

-Don't look for divergences in a non-trending market. There must be clear uptrend or downtrend.

## Bearish divergence

- We only look at the value of the Body of the candle and not the wicks.
- Remember, Bearish divergence is used to find the tops, so look at the Highs only.

### Characeteristics

- The price makes a Higher High but the oscillator makes a Lower High.
- This means that even though the price is moving higher, the average momentum of the look-back period is decreasing. This is a potential top signal.

![Bearish divergence](/static/images/trading/bearish_divergence.jpg)

## Types of divergences

- RSI divergences
- MACD and
- OBV

# Open interest

- Open interest is the metric that tells you the number of open derivatives contracts.

### It is the best tool to judge

- Long/Short sentiment.
- True volume strength.
- Market Structure.
- True Liquidity.
- Shift in trend

## OI trends (How to see OI in binance?)

1. `LONG BUILD-UP`: Price goes up OI goes up. Here the market participants are entering into new contracts and the long sentiment is stronger,
   pushing the prices higher.

2. `LONG COVERING (UNWINDING)`: In this scenario the OI and the price both decrease. This happens because Long previously entered are taking profits i.e. Contracts are being closed,
   reducing the OI. This mostly occurs after the price has seen a substantial rise (See the chart above) and is looking for a retracement or a Reversal.

3. `SHORT BUILD-UP`: In this scenario the price goes down with the OI increasing. The sentiment to open up a short trade is stronger.

4. `SHORT COVERING (UNWINDING)`: Here the price increases with the OI decreasing. This means that the people who had entered into a short position are closing their entries. This generally occurs after the price has made a substantial correction.

Open interest is the most important day trading tool.
Many traders don't understand it enough.

# EMA startegy of trading

- `Setup`: 13, 21, 2000 EMA on 15 minute chart.
- `Pecondition`:

1. Bullish crossover on the daily chart for 13 and 21 EMA.
2. 200 EMA on the 4 hourly chart acting as support.
3. All breakouts confirmed by volume. (13,21 EMA sloping upwards)
4. The 13 EMA should be over the 21 EMA after a contraction.
5. Both EMAs should be upward sloping.
6. The price should be above the EMAs.

- `Entry`: Enter when price bouce from 200EMA.

# Simple trading strategy

1. Open 4 hourly chart.
2. Add 200EMA
3. Use 200 EMA as the point of interest for entry/Exit.

# Reversals

1. Prices don't reverse at once.
2. There is a transition period when the prices move in a horizontal manner.
3. This horizontal movement is called consolidation.

## Reversal at top

1. Lower high being formed.
2. Continuous test of support (weakening)
3. Support breach with volume (used for confirmation)

![Reversal top](/static/images/trading/reversal_top.jpg)

## Trends

- `Trendline`: It is a zone rather than a line.
- `Uptrend`: higher highs and lows. Trendline is drawn connecting lows. Lows should be equidistant.
- `Downtrend`: lower highs and lows. Trendline is drawn connecting highs. Highs should be equidistant.
- Trendline with 45 degree slope or nearby are considered stronger. Steep trendline is not sustainable also trendline with small slope are also weak and can be broken easily.

## Support and resistance (SR)

- `SR line`: It is a zone rather than a line.
- Created by bulls and bears on their past experience with price action.
- The more number of times SR is tested the more reliable it is.
- SR can be created by ranges, trendlines, Fibonacci retracement and moving averages.

## Trading pullbacks

Pullback is temporary drop in price.Pullback must be fast or very few sessions otherwise it may signal a trend change. So don't trade pullback early.
`Breakout pullback`: trade when support is broken and retested and failed.
`Trendline pullback`: trade at third pullback (safe).
`Moving average pullback`:
`Fibonacci pullback`:

## Pullback trading strategies

- Breakout pullback
- MA pullback
- Trendline pullback
- Fibonacci retracement pullback

Use confluence of indicators to confirm entry.

### Trading breakout:

- Useful for capturing explosive moves and starting of trend in early stages.

### Fibonacci retracement levels:

- Used to identify SR. Remember they only gives alert zones and possibilities. Other indicators must also be used like MACD.
- FR helps in estimating extent of pullback or retracement or correction.
- when there is uptrend we can buy in Fibonacci retracement levels which act as support.
- when there is downtrend we can sell in Fibonacci retracement levels which act as resistance.
- in uptrend we draw retracement from swing low to high.
- in downtrend we draw retracement from swing high to low.

`Golden ratio`: Approx 1.6, ratio of consecutive numbers in Fibonacci sequence.

### Bollinger bands:

- Gives insight into volatility change.
- Three lines, middle one is simple moving average and the other two are standard deviation from the middle band.
- Width of bands indicates volatility, when width become low it may indicate starting of new trend and increased volatility.
- When price is ranging, it touches the bands and rebounds and may indicate a signal. This does not hold when price is in trend as it can remain overbought or oversold for extended time. In the trend when using Bollinger bands trade with the trend.

### Recommendations

SMA multiplier
10 1.9
20 2
50 2.1

## Chaikin money flow indicator

- Oscillates between -1 to 1
- If positive then buying pressure else selling pressure. Slope can indicate increasing sell/buy pressure.

# Types of coins and crypto

## Store of value crypto

BTC: only good for financial transactions. Is transfer of value.

Limited, finite supply, eg litecoin.

## Premined crypto Vs starting from scratch.

In Premined crypto most coins are with founders who will dump whenever the prices go up.

Fair launch:

## Smart contracts crypto

Eg Ethereum and Binance
A program that executes when certain conditions are met.

The program is immutable and can't be shut down as it is decentralised.

`Dapp`: A combination of smart contracts. Dapps can be used for payments, trading, lending borrowing or even gambling. No personal info is required for using a dapp. All you need is an internet connection. There is no middle man in a dapp to take cut or steal data.

Around 5k dapps on 2 dozen smart contract crypto currency blockchains.

The coin is used for payment for smart contract and dapp transactions. Eg eth and BnB. To have enough supply to pay for transaction the supply is not limited and have annual inflation schedule.

## Oracle crypto

Provides real world data to smart contract blockchains. For eg date, time, weather and stock info.

Eg chain link, band protocol and api3.

Traditionally we used APIs, oracle use multiple sources for any info from both institution and individual and take averages.

Oracle crypto is used to pay for fetching info.

Oracle crypto tokens are required to fetch the data.

Most oracle cryptos are Premined so their price don't go up.

Cardano has its own oracle and don't need other oracle.

## Payment crypto

Aim to replace the current payment systems like visa Mastercard and PayPal. They are very fast and much cheaper. Sometimes use Use smart contract for this.

You can keep them in your crypto wallet. You are owner and none can take it or block it.

Eg bitcoin cash, dash, terra, telcoin.

They have highest chances of mainstream adoption. Blockers are that they don't have a stable price also govt don't want them.

## Privacy crypto

Maintain your privacy while making transactions or using dapps.

Eg secret network: helps in creating privacy preserving dapps.

Tornado: privatise your transaction on Ethereum blockchain.

Eg Montero, zcash, dash.

Haven: used for creating synthetic fiat

Most of private crypto were not Premined. But they are targeted by govt and regulators so have existential threat.

They are being delisted from certain exchanges like bittex but crosschain Dec like thorchain will enable there trade.

## Exchange tokens

Owned and operated by exchanges they belong to.

Eg. Bnb, huobi etc

## Meme coin

Doge, Shiba inu.
