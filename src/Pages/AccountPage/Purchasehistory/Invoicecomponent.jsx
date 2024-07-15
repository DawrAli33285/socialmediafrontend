import React from 'react';

const InvoiceComponent = () => {
  const handleDownload = () => {
    const invoiceElement = document.getElementById('invoice');
    const html = invoiceElement.outerHTML;
    const blob = new Blob([html], { type: 'application/octet-stream' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'invoice.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="invoice" className="bg-white">
      <div style={{background:'#3D3A3A'}} className="flex justify-between invoice-firstdiv px-4">
        <div className="text-3xl font-bold text-purple-700 invoice-logo items-center justify-center"><img src="https://res.cloudinary.com/dbjwbveqn/image/upload/v1703879452/image_15-removebg-preview_1_ucf6sl.png"/></div>
        <div style={{height:'70%'}} className='flex flex-col items-center justify-center' >
          <div className="text-2xl font-bold text-white">INVOICE</div>
          <div className='text-white'>Invoice No. 12345</div>
        </div>
      </div>
  <div style={{fontSize:'clamp(1rem,3vw,1.3rem)'}} className='flex flex-row justify-between px-4'>
  <div className="mt-8">
        <div className="font-extrabold">INVOICE TO:</div>
        <div className="font-extrabold">Jane Aniston</div>
        <div>16 rue Cuvier 69006 Lyon, France</div>
      </div>
      <div  className="mt-8 flex flex-col items-end justify-center">
        <div className="font-bold">Order Number# 1273</div>
        <div className='flex justify-end items-end'>1 Sep, 2023</div>
      </div>
  </div>
      <div className="mt-8 invoice-firsttable px-4">
        <table className="w-full">
          <thead>
            <tr>
            <th className="text-left p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Name</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Price</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Incl. VAT</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Qty</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Discount</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>VAT</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Total Incl. VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subscription to sandra jane from 23/08/2023 to 23/08/2023</td>
              <td className="text-right">59€</td>
              <td className="text-right">5.9€</td>
              <td className="text-right">1</td>
              <td className="text-right">-</td>
              <td className="text-right">5.90€ 20%</td>
              <td className="text-right">5.99€</td>
            </tr>
          </tbody>
        </table>
      </div>
   <div className='flex items-center justify-center'>
   <div className='invoice-borders px-4'>

</div>
   </div>
      <div  className="flex justify-between items-center mt-8 px-4">
        <div style={{fontSize:'clamp(1rem,3vw,1.2rem)'}}>
          <div className="font-extrabold">Payment Information</div>
          <div>Paypal</div>
          <div>
            In case of Subscription, the User's payment method will be debited
            again at each renewal of the Subscription
          </div>
          <div>
            All orders are subject to CARMEN's terms & conditions:
            https://abc.com
          </div>
        </div>
        <div style={{fontSize:'clamp(1rem,3vw,1.3rem)'}} className="text-right flex flex-col items-end justify-end">
      <div className='flex flex-row space-x-3 font-extrabold'>
      <div className='font-bolder flex flex-col items-start justify-start'>
          <p className="font-extrabold">TOTAL EXCL. VAT</p>
          <p className="font-extrabold">VAT</p>
          </div>
          <div className='font-bolder'><p className="font-extrabold">59€</p><p className="font-extrabold">1€</p></div>
      </div>
          <div className='invoice-tabletwo' style={{background:'#3D3A3A',color:'white'}}>TOTAL INCL. VAT 5.99€</div>
        </div>
      </div>
      <div className="text-center mt-8">
        
      </div>
      <div className='invoice-footer'>
<p>AIR MEDIAS (RCS Lyon B 809 565 906) SAS with a capital of 507.800 euros - 16 RUE CUVIER, 69006 LYON - intracommunity VAT number FR90809565906 - SIRET 80956590600033</p>
      </div>
    </div>
  );
};

export default InvoiceComponent;
