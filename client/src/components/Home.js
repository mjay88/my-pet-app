import React from "react";
import Bug from "../images/3415.jpg";




export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to adopt a pet!!!</h1>
      <img src={Bug} alt="A cute orange tabby cat face" />
      <div className="home__inner-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint natus
          soluta blanditiis nihil iusto inventore. Tenetur illum ab
          necessitatibus, dicta velit rerum molestias perspiciatis, consectetur
          repudiandae expedita at nesciunt numquam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quas adipisci cum nemo minus eligendi,
          perferendis mollitia nostrum odio ad ipsa rerum natus laboriosam
          dolorem porro! Quas sequi mollitia repellendus repudiandae.
          <p>
            Lorem cupiditate molestiae illum aspernatur id quaerat molestias
            laboriosam. Dolores, adipisci rerum reiciendis, maxime praesentium
            facere, animi ex numquam quisquam architecto minus?
          </p>
        </p>
      </div>
    </div>
  );
}
