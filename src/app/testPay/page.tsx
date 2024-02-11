"use client"

import React, { useState } from 'react';
import { generatePayUrl } from '@/lib/pay/pay';
import { Poller } from '@/lib/pay/pay-result-query-poller';
import { PayRequest} from '@/lib/pay/models/pay-request'
import { Terminal } from '@/lib/pay/models/terminal';
export default function TestPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [pollingData, setPollingData] = useState(null);
    const TERMINAL_SN = '100065510035538110';
    const TERMINAL_KEY = '123778fdd5ae9a538b5949f9d92351cc';
    const URL = 'https://lit.cs-magic.cn';
    const orederCode = 'testorder003';
    const request = new PayRequest(orederCode, '10', 'ProductTest01',
    'cyx', URL);
    const terminal = new Terminal(TERMINAL_SN, TERMINAL_KEY);
    const payUrl = generatePayUrl(request, terminal);
    console.log(`payUrl:${payUrl}`);
    const handleButtonClick = async () => {
        setIsLoading(true);


            // 调用支付接口 
            fetch(payUrl, {
                redirect: 'follow' 
            })
                .then(data => {
                    const poller = new Poller(TERMINAL_SN, TERMINAL_KEY, orederCode);
                    poller.start();

                })
                .catch(error => {
                    console.error('调用支付接口时发生错误', error);
                    setIsLoading(false);
                });
    

  }


  return (        
    <div>
       <button
    onClick={handleButtonClick}
    disabled={isLoading}
    style={{ backgroundColor: 'white', color: 'black' }}>
    {isLoading ? '加载中...' : '调用接口'}
        </button>
        {pollingData && <div>轮询结果：{JSON.stringify(pollingData)}</div>}
    </div>);
}
