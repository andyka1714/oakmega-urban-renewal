import { Tooltip } from 'react-leaflet';
import { useSelector } from 'react-redux';
import Image from "next/image";
import { RootState } from '../../store/store';

const MarkerTooltip = () => {
    const {
      googleProfile,
      facebookProfile,
    } = useSelector((state: RootState) => state.app);

    const avatarWrapperWidth = facebookProfile && googleProfile ? 'w-[68px]' : 'w-8';
    return (
      <Tooltip direction="top" offset={[0, -30]}>
        <div className={`${avatarWrapperWidth} flex items-center gap-2 justify-center`}>
          {!facebookProfile && !googleProfile && <Image src="/default-avatar.png" alt="default" className="rounded-full" width={32} height={32} />}
          {facebookProfile && <Image src={facebookProfile.picture} alt="FB" className="rounded-full" width={32} height={32} />}
          {googleProfile && <Image src={googleProfile.picture} alt="Google" className="rounded-full" width={32} height={32} />}
        </div>
      </Tooltip>
    );
};

export default MarkerTooltip;