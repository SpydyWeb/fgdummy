import React from 'react';

const InsurerRolesComponent = ({ codes  }) => {
    const codeMap = {
        AA: 'Alternate Address',
        AG: 'Agent',
        AL: 'Alias',
        AP: 'Appointee',
        BN: 'Beneficiary',
        CB: 'Client Bank Account',
        CF: 'Cash Payer',
        CL: 'Claimant',
        DA: 'Dispatch Address',
        DR: 'Doctor',
        ES: 'ESTATE/SUBSIDIARY',
        GA: 'Group Agent',
        GC: 'Group Claimant',
        GN: 'Group Nominee/Subsidiary',
        GR: 'Group',
        GT: 'Guarantor',
        HP: 'Hire Purchase Company',
        JL: 'Joint Life Assured',
        JO: 'Joint Owner',
        LF: 'Life Assured',
        ND: 'Named Driver',
        NE: 'Assignee',
        OR: 'Outward Reinsurer',
        OW: 'Owner',
        PE: 'Payee',
        PR: 'Principal',
        PY: 'Payer',
        RL: 'Life Reassurer',
        SE: 'Employer',
      };
    
      const descriptions = codes?.split(',')?.map((code) => ({
        code,
        description: codeMap[code] || 'Invalid Code',
      }));
    
      return (
        <>
        
        {descriptions?.map(({ code, description }, index) => (
        <span key={code} className='mr-2'>
          
          {description}
          {index < descriptions?.length - 1 && ','}
        </span>
      ))}
      
          {/* {descriptions.map(({ code, description }) => (
            <span key={code} className='mr-10'>
        
           
                <strong>{code} - </strong>
                
                 {description}
           
            </span>
          ))} */}

        </>
      );
    };

export default InsurerRolesComponent;
