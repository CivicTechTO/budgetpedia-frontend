// tribes.tsx
// required by bundler
import * as React from 'react'

const SocialMedia = () => 
    <div>
        <h1>Facebook</h1>
        <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbudgetpedia%2F&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
            width="500" 
            height="700" 
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no" 
            frameborder="0" 
            allowTransparency={true}>
                
        </iframe> 
    </div>   

export default SocialMedia