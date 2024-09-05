import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const PaymentsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.paymentID}</p>
const dropdownTemplate1 = (rowData, { rowIndex }) => <p >{rowData.payeeName?.name}</p>
const paymentStatus = JSON.parse('{"0":"Pending","1":"Completed","2":"Failed"}');
const dropdownObjectTemplate2 = (rowData, { rowIndex }) => <p >{paymentStatus[rowData.paymentStatus]}</p>
const paymentMethod = JSON.parse('{"0":"CreditCard","1":"BankTransfer","2":"Cash"}');
const dropdownObjectTemplate3 = (rowData, { rowIndex }) => <p >{paymentMethod[rowData.paymentMethod]}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.receiptURL}</p>
const calendarTemplate5 = (rowData, { rowIndex }) => <p>{new Date(rowData.paymentDate).toLocaleDateString()}</p>
const p_numberTemplate6 = (rowData, { rowIndex }) => <p >{rowData.paymentamount}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "payments"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="paymentID" header="Payment ID" body={pTemplate0} filter={selectedFilterFields.includes("paymentID")} hidden={selectedHideFields?.includes("paymentID")}  sortable style={{ minWidth: "8rem" }} />
<Column field="payeeName" header="Payee Name" body={dropdownTemplate1} filter={selectedFilterFields.includes("payeeName")} hidden={selectedHideFields?.includes("payeeName")}  style={{ minWidth: "8rem" }} />
<Column field="paymentStatus" header="Payment Status" body={dropdownObjectTemplate2} filter={selectedFilterFields.includes("paymentStatus")} hidden={selectedHideFields?.includes("paymentStatus")}  style={{ minWidth: "8rem" }} />
<Column field="paymentMethod" header="Payment Method" body={dropdownObjectTemplate3} filter={selectedFilterFields.includes("paymentMethod")} hidden={selectedHideFields?.includes("paymentMethod")}  style={{ minWidth: "8rem" }} />
<Column field="receiptURL" header="Receipt URL" body={pTemplate4} filter={selectedFilterFields.includes("receiptURL")} hidden={selectedHideFields?.includes("receiptURL")}  sortable style={{ minWidth: "8rem" }} />
<Column field="paymentDate" header="Payment Date" body={calendarTemplate5} filter={selectedFilterFields.includes("paymentDate")} hidden={selectedHideFields?.includes("paymentDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="paymentamount" header="Payment Amount" body={p_numberTemplate6} filter={selectedFilterFields.includes("paymentamount")} hidden={selectedHideFields?.includes("paymentamount")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
        <Dialog header="Upload Payments Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService />
      </Dialog>

      <Dialog header="Search Payments" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default PaymentsDataTable;