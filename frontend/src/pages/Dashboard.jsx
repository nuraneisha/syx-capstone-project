import Header from "../components/Header"
import Body from "../components/Body"
import Footer from "../components/Footer"
export default function Dashboard() {
    return (
        <>
            <div style={{ position: "relative" }}>
                <Header />
            </div>
            <Body />
            <Footer />
        </>
    )
}