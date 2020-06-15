# IPLicious

**IPLicious** is a Progressive Web App that allows you to view some interesting stats about the Indian Premier League. The app allows you to look at the stats, filter them according to your wish, and even interact with the charts.
The stats themselves have been divided into three categories :

1. **_Batting Stats_**
   - Most Runs scored at the death overs
   - The Best Partnership Duo
   - Number of Runs Scored of each type
2. **_Bowling Stats_**
   - Most Dot Balls bowled
   - Most Extras Conceded
   - Number of Dismissals of each type
3. **_Venue Stats_**
   - Number of Wins for the Home and Away Teams
   - Number of Wins batting first and second
   - Over Progression for 1st and 2nd Innings

The Bowling and Batting Stats can be filtered via Years (2008-2018, All-Time) while the Venue Stats can be filtered via specific venues or all of the venues.

[Repository URL](https://github.com/subClassy/iplicious)
[WebApp URL](https://subclassy.github.io/iplicious/)

## Libraries and Frameworks used

To complete the above web app I used the following Libraries/Frameworks :

- `ReactJs`: The complete UI for the web app has been written using the ReactJs library.
- `Creat-React-App (CRA)`: CRA is a tool to set up a React Application with a single command. I chose to use CRA because it not only makes the setup of the app easier it also provides in-built support for Progressive Web Apps (PWA).
- `antd`: antd is a React UI library based on the Ant Design specifications. It provides a lot of high-quality and responsive react components out-of-the-box. Using this allowed me to handle the responsiveness of the complete UI more elegantly.
- `nivo`: nivo is a powerful charting library built for React on top of D3. All the charts in web app have been made using nivo. The most important reason for using nivo was the responsive charts that are provided by the library.
- `SASS`: SASS is basically CSS on steroids. It makes writing and reading CSS much easier.
- `git`: Version-control system

## Bonus Points

- [ ] `Use Vue.js to create the web-app` - I used ReactJs to develop the app because of my experience and familiarity with the library.
- [x] `Optimise the Loading Time` - To optimize the loading time of the app I used **code-splitting** to _lazy-load_ just the things that are needed currently. In ReactJs I achieved this using _Lazy_ which dynamically imports the components and _Suspense_ which provides a fallback for the components until they are loaded. Along with this, the **html-webpack-plugin** was used to minify CSS and JS along with other optimizations.
- [x] `Mobile Responsive` - The complete UI has been made responsive for easy viewing on devices of all sizes. This was achieved partly with the help of the libraries I used like antd and nivo and partly with the help of media queries placed at certain breakpoints.
- [x] `Progressive Web App` - The CRA provides in-built support for PWA with Service Workers and the Manifest File. It also provides support for caching to load the websites faster and allowing them to be usable when offline. The **workbox-webpack-plugin** is integrated into production configuration, and it generates a service worker file that will automatically precache all local assets.
- [x] `Offline Usable` - This feature is a by-product of the PWA. Since the assets are being cached the app is usable even when one is offline.
