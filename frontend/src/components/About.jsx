//marking for pull request analysis/
import portrait from "../assets/IMG_3983.jpg"; //I am well aware how goofy the photo is but it was all I had at the time and frankly it grew on me.

export default function About() {
  return (
    <>
      <div className="about__main">
        <img
          src={portrait}
          alt="My profile pic"
          className="about__profile-picture"
        />
        <div className="about__sub-wrapper">
          <h3 className="about__title">About the author</h3>
          <div className="about__text-sub-wrapper">
            <p className="about__text-content">
              My name is Michael Weihmann and I am an aspiring full stack
              developer with an emphasis on React and Express.
            </p>
            <p className="about__text-content">
              My experience with Tripleten has equipped me to navigate the
              perils of modern web development and potentially help my customers
              wade through their respective challenges too- I am right in it
              with you!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
