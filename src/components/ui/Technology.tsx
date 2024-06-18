const Technology = () => {
  return (
    <li className='items-list__item'>
      <div className='items-list__header'>
        <div className='items-list__image'>
          <video
            id='js-video-play'
            src='https://f.hubspotusercontent10.net/hubfs/4992313/video_hand_tracking_skeleton-min.mp4'
            playsInline
            muted
            autoPlay
            loop
          />
        </div>
      </div>
      <div className='items-list__content'>
        <span className='items-list__title'>Skeleton Model</span>
        <div className='items-list__text'>
          <div>
            <p>
              We build a hand skeleton model of 11 points on fingers,
              fingertips, palm, and wrist. It lets us estimate and accurately
              predict the position of a hand and fingers, even if they are
              partially overlapped. Users can naturally move hands without
              breaking an AR experience.
            </p>
          </div>
          <div>
            <picture>
              <source
                srcSet='https://f.hubspotusercontent10.net/hubfs/4992313/img_BFT_madeforfaceAR-min.webp, https://f.hubspotusercontent10.net/hubfs/4992313/img_BFT_madeforfaceAR@2x-min.webp 2x'
                type='image/webp'
                sizes='460px'
                data-srcset='https://f.hubspotusercontent10.net/hubfs/4992313/img_BFT_madeforfaceAR-min.webp, https://f.hubspotusercontent10.net/hubfs/4992313/img_BFT_madeforfaceAR@2x-min.webp 2x'
              />
              <source
                srcSet='https://f.hubspotusercontent10.net/hubfs/4992313/img_BFT_madeforfaceAR-min.jpg,  2x'
                type='image/jpeg'
                sizes='460px'
                data-srcset='https://f.hubspotusercontent10.net/hubfs/4992313/img_BFT_madeforfaceAR-min.jpg,  2x'
              />
            </picture>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Technology;
