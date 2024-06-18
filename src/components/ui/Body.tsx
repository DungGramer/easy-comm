import Hero from "../../assets/hero.svg";
import { IoSchool } from "react-icons/io5";
import { TbStethoscope } from "react-icons/tb";
import { PiHandshake } from "react-icons/pi";
import { TbSos } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
const Body = () => {
  const navigate = useNavigate();

  return (
    <div className='page__content'>
      <section className='hero'>
        <div className='hero__bg '>
          <img src={Hero} className='bg-[#32005f]' />
        </div>
        <div className='hero__inner container'>
          <div className='hero__content'>
            <h1 className='hero__title'>Theo dõi cử động tay</h1>
            <p className='hero__text'>
              Xây dựng các ứng dụng AR tương tác với công nghệ nhận dạng và nhận
              dạng cử chỉ 3D thời gian thực của chúng tôi.
            </p>
            <div className='hero__buttons'>
              <div className='hero__btn'>
                <a
                  href={"/hand-tracking"}
                  className='btn btn-w100 js-scroll-to'
                >
                  Dùng thử ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section section-landings'>
        <div className='container'>
          <header className='section__header'>
            <h2 className='section__title'>
              Thu hẹp khoảng cách: Kết nối với cộng đồng người khiếm thính
            </h2>
            <p className='section__text section__text--small'>
              Khám phá những lợi thế của việc chuyển đổi ngôn ngữ ký hiệu thành
              văn bản. Cho dù bạn là một cá nhân khiếm thính đang tìm cách giao
              tiếp hiệu quả hơn trong các giao dịch hàng ngày, hoặc một doanh
              nghiệp nhằm mục đích toàn diện hơn, công nghệ của chúng tôi thu
              hẹp khoảng cách. Chúng tôi nhấn mạnh các ứng dụng trong thế giới
              thực từ cài đặt giáo dục đến tương tác dịch vụ khách hàng.
            </p>
          </header>
          <div className='section__content'>
            <ul className='items-list'>
              <li className='items-list__item'>
                <div className='items-list__header'>
                  <div className='items-list__image'>
                    <video
                      id='js-video-play'
                      src='/1.mp4'
                      playsInline
                      muted
                      autoPlay
                      loop
                    />
                  </div>
                </div>
                <div className='items-list__content'>
                  <span className='items-list__title'>
                    Tăng cường giao tiếp với người khiếm thính
                  </span>
                  <div className='items-list__text'>
                    <div>
                      <p>
                        Khám phá những lợi ích của dịch thuật ngôn ngữ ký hiệu,
                        dành cho cả người khiếm thính và những người không biết
                        ngôn ngữ ký hiệu. Công cụ này mở ra những con đường mới
                        để tương tác, làm cho các cuộc trò chuyện hàng ngày, các
                        cuộc họp kinh doanh và các hoạt động giáo dục trở nên
                        gắn kết và dễ truyền đạt hơn.
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li className='items-list__item'>
                <div className='items-list__header'>
                  <div className='items-list__image'>
                    <video
                      id='js-video-play'
                      src='/2.mp4'
                      playsInline
                      muted
                      autoPlay
                      loop
                    />
                  </div>
                </div>
                <div className='items-list__content'>
                  <span className='items-list__title'>
                    Những người khiếm thính có hiểu được những gì họ đọc?
                  </span>
                  <div className='items-list__text'>
                    <section>
                      <p>
                        Tất nhiên họ có thể! Tuy nhiên, những người khiếm thính
                        gặp khó khăn trong việc hiểu những gì họ đọc vì việc
                        tiếp thu ngôn ngữ đầu tiên của họ là ngôn ngữ ký hiệu.
                      </p>
                    </section>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='section performance'>
        <div className='performance__inner'>
          <div className='performance__image'>
            <video
              id='js-video-play'
              src='/3.mp4'
              playsInline
              muted
              autoPlay
              loop
            />
          </div>
          <div className='performance__content'>
            <h2 className='performance__title'>Tính năng</h2>
            <div className='performance__text'>
              <ul>
                <li aria-level={1}>
                  Tự động phát hiện bàn tay theo thời gian thực
                </li>
                <li aria-level={1}>Khoảng cách: 2 mét</li>
                <li aria-level={1}>Có thể nhận được cả 2 tay</li>
                <li aria-level={1}>
                  Đầu ra ổn định với các góc và chuyển động tay khác nhau
                </li>
                <li aria-level={1}>
                  Nhận diện và trả kết quả gần như ngay lập tức
                </li>
                <li aria-level={1}>
                  Thích ứng với các trường hợp sử dụng trong điều kiện ánh sáng
                  yếu, ngoài trời hoặc trong cửa hàng
                </li>
                <li aria-level={1}>
                  Tiêu thụ điện năng tối thiểu trên thiết bị di động
                </li>
              </ul>
            </div>
            <div className='performance__button'>
              <a className='btn btn-dark js-scroll-to' href={"/hand-tracking"}>
                Trải nghiệm ngay
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        className='section section-landings '
        style={{ background: "#fff" }}
      >
        <div className='container'>
          <h2 className='section__title'>Các lĩnh vực ứng dụng</h2>
          <p className='section__text'>
            Take mobile AR interactions to the next level with our hand tracking
            software easily added to your iOS and Android apps.
          </p>
          <div className='section__content'>
            <ul className='features-grid  section-landings__features-grid section-landings__card-simple--fields'>
              <li className='features-grid__item'>
                <div className='features-grid__header'>
                  <div className='features-grid__image'>
                    <IoSchool
                      width={64}
                      fontSize={64}
                      style={{
                        padding: 12,
                        borderRadius: 999,
                        background: "#f6f6fa",
                      }}
                    />
                  </div>
                </div>
                <div className='features-grid__content'>
                  <h4 className='features-grid__title font-bold'>Giáo dục</h4>
                  <p className='features-grid__text'>
                    Tạo môi trường học tập hòa nhập dành cho học sinh khiếm
                    thính. Công nghệ này có thể được sử dụng trong lớp học để
                    dịch ngôn ngữ ký hiệu của học sinh thành văn bản hoặc giọng
                    nói trong thời gian thực, cho phép học sinh khiếm thính tham
                    gia tích cực hơn vào các cuộc thảo luận và bài giảng. Ngoài
                    ra, nó còn hỗ trợ cho học sinh và giáo viên trong việc hiểu
                    ngôn ngữ ký hiệu, thúc đẩy trải nghiệm lớp học tích hợp hơn.
                  </p>
                </div>
              </li>
              <li className='features-grid__item'>
                <div className='features-grid__header'>
                  <div className='features-grid__image'>
                    <TbStethoscope
                      width={64}
                      fontSize={64}
                      style={{
                        padding: 12,
                        borderRadius: 999,
                        background: "#f6f6fa",
                      }}
                    />
                  </div>
                </div>
                <div className='features-grid__content'>
                  <h4 className='features-grid__title font-bold'>
                    Chăm sóc sức khỏe
                  </h4>
                  <p className='features-grid__text'>
                    Phiên âm theo thời gian thực, đảm bảo rằng bệnh nhân khiếm
                    thính hiểu đầy đủ về chẩn đoán, kế hoạch điều trị và tư vấn
                    y tế, đảm bảo giao tiếp chính xác và hiệu quả.
                  </p>
                </div>
              </li>
              <li className='features-grid__item'>
                <div className='features-grid__header'>
                  <div className='features-grid__image'>
                    <PiHandshake
                      width={64}
                      fontSize={64}
                      style={{
                        padding: 12,
                        borderRadius: 999,
                        background: "#f6f6fa",
                      }}
                    />
                  </div>
                </div>
                <div className='features-grid__content'>
                  <h4 className='features-grid__title font-bold'>
                    Dịch vụ khách hàng
                  </h4>
                  <p className='features-grid__text'>
                    Các doanh nghiệp có thể sử dụng chuyển đổi ngôn ngữ ký hiệu
                    thành nhắn tin để nâng cao dịch vụ khách hàng dành cho khách
                    hàng khiếm thính hoặc khiếm thính. Bằng cách tích hợp công
                    nghệ này vào nền tảng dịch vụ khách hàng, doanh nghiệp có
                    thể giao tiếp hiệu quả hơn với khách hàng khiếm thính , dù
                    là trực tiếp hay thông qua các kênh dịch vụ khách hàng ảo.
                    Tính toàn diện này có thể cải thiện sự hài lòng của khách
                    hàng và mở rộng phạm vi tiếp cận thị trường của công ty.
                  </p>
                </div>
              </li>
              <li className='features-grid__item'>
                <div className='features-grid__header'>
                  <div className='features-grid__image'>
                    <TbSos
                      width={64}
                      fontSize={64}
                      style={{
                        padding: 12,
                        borderRadius: 999,
                        background: "#f6f6fa",
                      }}
                    />
                  </div>
                </div>
                <div className='features-grid__content'>
                  <h4 className='features-grid__title font-bold'>
                    Dịch vụ khẩn cấp
                  </h4>
                  <p className='features-grid__text'>
                    Giao tiếp hiệu quả trong trường hợp khẩn cấp là rất quan
                    trọng, đặc biệt đối với những người bị điếc hoặc lãng tai.
                    Phần mềm có thể được triển khai trong các hệ thống ứng phó
                    khẩn cấp để đảm bảo rằng những người khiếm thính có thể
                    truyền đạt nhu cầu của họ một cách nhanh chóng và rõ ràng
                    trong những tình huống nguy cấp. Công nghệ này có thể được
                    sử dụng trong các trung tâm cuộc gọi khẩn cấp, các tình
                    huống ứng phó thảm họa và thậm chí trong các hệ thống cảnh
                    báo để cung cấp các tùy chọn liên lạc dễ tiếp cận theo thời
                    gian thực cho cộng đồng người khiếm thính.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <div
        id='hs_cos_wrapper_module_16477730224441'
        className='hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_module'
        style={{}}
        data-hs-cos-general-type='widget'
        data-hs-cos-type='module'
      >
        <section
          data-nosnippet
          className='section section-landings'
          id='featurescard'
        >
          <div className='container'>
            <h2 className='section__title'>
              Technical Features &amp; System Requirements
            </h2>
            <div className='features-card-list   features-card-list--large   '>
              <div className='features-card-list__cell'>
                <div className='features-card'>
                  <div className='features-card__header'>
                    <div className='features-card__image'>
                      <img src='https://www.banuba.com/hubfs/img_TF_apple-1.svg' />
                    </div>
                    <h4 className='features-card__title'>iOS</h4>
                  </div>
                  <div className='features-card__content'>
                    <div className='features-card__text'>
                      10.0+, iPhone 5s+, Metal API
                    </div>
                    <ul className='features-card__list'></ul>
                  </div>
                </div>
              </div>
              <div className='features-card-list__cell'>
                <div className='features-card'>
                  <div className='features-card__header'>
                    <div className='features-card__image'>
                      <img src='https://www.banuba.com/hubfs/logo-android-Mar-20-2022-10-44-44-65-AM.svg' />
                    </div>
                    <h4 className='features-card__title'>Android</h4>
                  </div>
                  <div className='features-card__content'>
                    <div className='features-card__text'>
                      6.0, API level 23+
                    </div>
                    <ul className='features-card__list'></ul>
                  </div>
                </div>
              </div>
              <div className='features-card-list__cell'>
                <div className='features-card'>
                  <div className='features-card__header'>
                    <div className='features-card__image'>
                      <img src='https://www.banuba.com/hubfs/logo-apple-4.svg' />
                    </div>
                    <h4 className='features-card__title'>MacOS</h4>
                  </div>
                  <div className='features-card__content'>
                    <div className='features-card__text'>10.13+, Metal API</div>
                    <ul className='features-card__list'></ul>
                  </div>
                </div>
              </div>
              <div className='features-card-list__cell'>
                <div className='features-card'>
                  <div className='features-card__header'>
                    <div className='features-card__image'>
                      <img src='https://www.banuba.com/hubfs/img_TF_windows-1.svg' />
                    </div>
                    <h4 className='features-card__title'>Windows</h4>
                  </div>
                  <div className='features-card__content'>
                    <div className='features-card__text'>8.1+</div>
                    <ul className='features-card__list'></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
};

export default Body;
