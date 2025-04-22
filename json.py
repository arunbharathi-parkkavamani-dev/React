data = [
    ("Accounts Report", ["react-icons/ai", "AiOutlineFileSearch"], ["Sales Abstract GST","Schema Wise Openning & Closing", "Sales Return Abstract", "Card Collection Report", "Cheque Collection Report", "Net Banking Collection Report", "Advance Receipt & Utilized Report", "Day Transaction", "Category Wise BT Report", "Category Wise Stock Report", "GST R1 Sales Report", "Book Stock", "GST R2 Purchase Report", "EDA Item Wise Report", "EDA Purchase Report", "EDA Partly Sold Report", "HSN Code Sales Abstract", "Receipt Ledger", "Category Wise Day Transaction"],["Sales-Abstract-GST", "Schema-Wise-Opening-And-Closing", "Sales-Return-Abstract", "Card-Collection-Report","Cheque-Collection-Report", "Net-Banking-Collection-Report", "Advance-Receipt-And-Utilized-Report", "Day-Transaction", "Category-Wise-BT-Report", "Category-Wise-Stock-Report", "GST-R1-Sales-Report", "Book-Stock", "GST-R2-Purchase-Report", "EDA-Item-Wise-Report", "EDA-Purchase-Report", "EDA-Partly-Sold-Report", "HSN-Code-Sales-Abstract", "Receipt-Ledger", "Category-Wise-Day-Transaction"]), 
    ("Other Inventory Module",["react-icons/gi", "GiCargoCrate"], ["Inventory Category", "Packaging Item Size", "Inventory Type", "Product Mapping", "Purchase Entry", "Packaging Entry", "Packaging Item Issue", "Tagging"], ["Inventory-Category", "Packaging-Item-Size", "Inventory-Type", "Product-Mapping", "Purchase-Entry", "Packaging-Entry", "Packaging-Item-Issue", "Tagging"]), 
    ("Other Inventory Report", ["react-icons/hi", "HiOutlineClipboardList"], ["Stock In & Out Report", "Available Stock Item Wise", "Reorder Report" ], ["Stock-In-And-Out-Report", "Available-Stock-Item-Wise", "Reorder-Report"]), 
    ("Masters", ["react-icons/gi", "GiSettingsKnobs"], ["Scheme", "Scheme Group", "Customer", "Employee", "Customer Profile", "Department", "Upload Apk", "Designation", "Profession", "Bank", "Payment Mode", "Drawee Account", "Weight", "Scheme Classification", "Wallet Plan", "Branch", "Wallet Category", "Wallet Category Settings", "Villages / Zone Allocation", "Zones", "Web Registered Devices", "Gift"], ["Scheme", "Scheme-Group", "Customer", "Employee", "Customer-Profile", "Department", "Upload-Apk", "Designation", "Profession", "Bank", "Payment-Mode", "Drawee-Account", "Weight", "Scheme-Classification", "Wallet-Plan", "Branch", "Wallet-Category", "Wallet-Category-Settings", "Villages-Or-Zone-Allocation", "Zones", "Web-Registered-Devices", "Gift"]),
    ("Payment", ["react-icons/fa", "FaMoneyCheckAlt"], ["Scheme Payment", "Post Dated Payment", "Verify Payment", "Payment Approval", "Sync Gateway Settlement"], ["Scheme-Payment", "Post-Dated-Payment", "Verify-Payment", "Payment-Approval", "Sync-Gateway-Settlement"]),
    ("Manage Scheme", ["react-icons/md", "MdCardGiftcard"], ["Manage Account", "Create Account","Closed Account", "Account Approval", "Passbook", "Manage Account List", "Customer Scheme Enquiry"], ["Manage-Account", "Create-Account", "Closed-Account", "Account-Approval", "Passbook", "Manage-Account-List", "Customer-Scheme-Enquiry"]), 
    ("Settlement", ["react-icons/ri", "RiHandCoinLine"], ["Pre Settlement", "Post Settlement"] , ["Pre-Settlement", "Post-Settlement"]),
    ("CRM Catalog",["react-icons/bi", "BiBookContent"],["Category List", "Product"],["Category-List", "Product"]), 
    ("Promotion", ["react-icons/gi", "GiMegaphone"],["Offers", "New Arrivals", "Send Notification"],["Offers", "New-Arrivals", "Send-Notification"]), 
    ("Agent", ["react-icons/ri", "RiUserSettingsLine"],["Agent", "Agent Referral Report", "Agent Settlement", "Summary", "Agent KYC"],["Agent", "Agent-Referral-Report", "Agent-Settlement", "Summary", "Agent-KYC"]), 
    ("SMS", ["react-icons/bi", "BiMessageRounded"],["Quick  SMS", "Group SMS", "SMS Delivery Report"],["Quick-SMS", "Group-SMS", "SMS-Delivery-Report"]), 
    ("E-Mail", ["react-icons/md", "MdEmail"],["Email", "Group Email"],["Email", "Group-Email"]), 
    ("Chit Reports", ["react-icons/fa", "FaRegFileAlt"],["Scheme A/c Ledger - Old", "Source wise Report", "Mode-wise Pay Summary", "Collection - Employee wise", "Collection - Online Payments", "Chit Old Metal Report", "Collection - Online /Offline Mode Wise", "Scheme Wise Mode Wise Report", "Gift Report", "Renewal/Live Report", "Customer Unpaid Report", "Birth Day/Wedding Day", "Member Report", "Maturity Report", "Customer Outstanding Payment Report", "Employee collection Summary", "Update Employee Referral Account", "Wallet Unregistered Customer", "Employee wise Sch Accounts Report", "Closed Account Report", "Akshaya Thiruthiyai Spl - Report", "Scheme Wise Pending", "Payment Cancel Report", "Auto Debit Subscription Status Report", "Chit Analysis Report", "Akshaya Thiruthiyai Spl - Report", "Staff Incentive Report"],["Scheme-Account-Ledger-Old", "Source-wise-Report", "Mode-wise-Pay-Summary", "Collection-Employee-wise", "Collection-Online-Payments", "Chit-Old-Metal-Report", "Collection-Online-Offline-Mode-Wise", "Scheme-Wise-Mode-Wise-Report", "Gift-Report", "Renewal-Live-Report", "Customer-Unpaid-Report", "Birth-Day-Wedding-Day", "Member-Report", "Maturity-Report", "Customer-Outstanding-Payment-Report", "Employee-collection-Summary", "Update-Employee-Referral-Account", "Wallet-Unregistered-Customer", "Employee-wise-Sch-Accounts-Report", "Closed-Account-Report", "Akshaya-Thiruthiyai-Spl-Report", "Scheme-Wise-Pending", "Payment-Cancel-Report", "Auto-Debit-Subscription-Status-Report", "Chit-Analysis-Report", "Akshaya-Thiruthiyai-Spl-Report", "Staff-Incentive-Report"])
]

structure = {
    "data": []
}

for item in data:
    label = item[0].strip()
    icon_package = item[1][0].strip() if len(item[1]) > 0 else ""
    icon_name = item[1][1].strip() if len(item[1]) > 1 else ""
    sub_names = [name.strip() for name in item[2]] if len(item) > 2 else []
    sub_paths = [path.strip() for path in item[3]] if len(item) > 3 else []

    structure["data"].append({
        "label": label,
        "icon": {
            "package": icon_package,
            "name": icon_name,
        },
        "sublabels": [
            {
                "name": sub_name,
                "path": sub_path,
                "role": "null"
            } for sub_name, sub_path in zip(sub_names, sub_paths)
        ]
    })

print(structure["data"])