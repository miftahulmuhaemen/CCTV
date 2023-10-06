import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';

const PosterInner = ({ building, user }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [floorName, setFloorName] = useState('');
  const [isFullSize, setIsFullSize] = useState(false);
  const [ipList, setIpList] = useState([{ ip: '', name: '' }]);
  const handleFloorNameChange = (e) => {
    setFloorName(e.target.value);
  };
  
  const handleIsFullSizeChange = (e) => {
    setIsFullSize(e.target.checked);
  };
  
  const handleIpChange = (index, field, value) => {
    const newIpList = [...ipList];
    newIpList[index][field] = value;
    setIpList(newIpList);
  };
  
  const addIpInput = () => {
    setIpList([...ipList, { ip: '', name: '' }]);
  };
  
  const removeIpInput = (index) => {
    const newIpList = [...ipList];
    newIpList.splice(index, 1);
    setIpList(newIpList);
  };

  const { mutate } = usePostPages();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher(`/api/buildings/${building._id}/floors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: floorName,
            buildingId: building._id,
            cameraIPs: ipList,
            isFullSize: isFullSize,
          }),
        });
        toast.success('You have insert new Floor successfully');
        setFloorName('');
        setIpList(['']);
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, ipList]
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Container className={styles.creator}>
        <div className={styles.formSection}>
          {/* <label className={styles.label}>Is View Fullsize?:  */}
          <label className={styles.checkbox}>Is the view in full-size?
            <input type="checkbox" onChange={handleIsFullSizeChange}/>
            <span class={styles.checkmark}></span>
          </label>
        {/* </label> */}
        </div>
        <div className={styles.formSection}>
          <label className={styles.label}>Floor Name:</label>
          <input
            type="text"
            className={styles.input}
            value={floorName}
            onChange={handleFloorNameChange}
          />
        </div>
        <div className={styles.formSection}>
          <label className={styles.label}>IP Addresses:</label>
          {ipList.map((ipObject, index) => (
            <div className={styles.ipInputContainer} key={index}>
              <input
                type="text"
                className={styles.ipInput}
                placeholder={`Enter Name ${index + 1}`}
                value={ipObject.name}
                onChange={(e) => handleIpChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                className={styles.ipInput}
                placeholder={`Enter IP Address ${index + 1}`}
                value={ipObject.ip}
                onChange={(e) => handleIpChange(index, 'ip', e.target.value)}
              />
              {/* <input
                type="text"
                className={styles.ipInput}
                placeholder={`Enter IP Address ${index + 1}`}
                value={ipObject.ipAddress}
                onChange={(e) => handleIpChange(index, e.target.value)}
              /> */}
              {index > 0 && (
                <button
                  className={styles.removeButton}
                  onClick={() => removeIpInput(index)}
                >
                  Buang IP
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={addIpInput}>
            Tambah IP
          </button>
          <Button type="success" loading={isLoading} onClick={onSubmit}>
            Tambahkan Lantai
          </Button>
        </div>
      </Container>
    </form>
  );
};

const Poster = ({building}) => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} building={building} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref legacyBehavior>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
