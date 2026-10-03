import Modal from '@/components/ui/Modal'
import PDFViewer from '@/components/ui/PDFViewer'
import React from 'react'

const KonscioHousingPDFModal = () => {
  return (
    <Modal id="konscio-housing-modal" className="size-full">
        <PDFViewer src={"/pdf/programa_konscio_housing.pdf"} className='size-full' />
    </Modal>
  )
}

export default KonscioHousingPDFModal