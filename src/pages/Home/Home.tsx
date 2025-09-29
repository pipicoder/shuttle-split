import './Home.css'
import Footer from "../../components/Footer/Footer"
import ShuttleSplit from "../../components/ShuttleSplit/ShuttleSplit"

const Home = () => {
  return (
    <div className="home">
      <div className="main">
        <ShuttleSplit/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home

