import { Tab } from '@headlessui/react';
import { contractAddress } from 'config/constants/chainId';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

import { useBridgeContract, useTokenContract } from '@/hooks/useContract';

import { Bridge } from '../Bridge';
import { Facet } from '../Facet';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  const { chain } = useNetwork();
  const chainId = chain?.id || 5;
  const [contract, setContract] = useState();

  const contractBridge = useBridgeContract(
    contractAddress.Bridge[chainId],
    chainId
  );
  const contractToken = useTokenContract(contractAddress.tokenER20[5], 5);

  useEffect(() => {}, [contractToken]);

  const contractValues = async () => {
    // const balance = await contractToken?.balanceOf(
    //   '0x80dD5aD6B8775c4E31C999cA278Ef4D035717872'
    // );
    // console.log(balance);
    // return balance;
    console.log(await contractToken?.name());
  };

  contractValues();

  const categories = ['Bridge', 'Facet'];
  return (
    <div className="mt-16 w-full max-w-xl py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected ? 'bg-blue-900 shadow text-white' : 'text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((_cat, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-blue-900 p-3 h-96',
                'bg-blue-900 focus:outline-none'
              )}
            >
              <button onClick={contractValues}>clis</button>
              {idx === 1 ? <Facet /> : <Bridge />}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
