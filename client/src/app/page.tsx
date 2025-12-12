import Image from "next/image"
export default function LandingPage(){
    return(
        <main>
            <Image className="center-in-page" style={{marginInline:"auto"}}src="/filmcal_hero.png" alt="film projector casting the image of a calendar with film reels in each day's box" width={500} height={500}/>
            <section className="center-in-page">
            <h2 style={{textAlign:"center"}}>Cue your Calendar!</h2>
            <div className="cta-grid ">
                <div className="cta-item">
                    <Image src="/add_calendar.png" alt="''" aria-hidden= {"true"} width={125} height={125}/>
                    <h3>Schedule your films</h3>
                    <p>Create a film schedule that you can easily add to your work or personal calendar.</p>
                </div>
                <div className="cta-item">
                    <Image src="/detail_calendar.png" alt="''" aria-hidden= {"true"} width={125} height={125}/>
                    <h3>Curate your Experience</h3>
                    <p>Add important notes or thoughts to help shape the way others experience your film calendar.</p>
                </div>
                <div className="cta-item">
                    <Image src="/share_calendar.png" alt="''" aria-hidden= {"true"} width={125} height={125}/>
                    <h3>Share your Calendar</h3>
                    <p>Distribute your calendared watchlist with your film students, friends, or even the world.</p>
                </div>
            </div>
            </section>
        </main>
    )
}